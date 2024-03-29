/**
 * Data that resolves to give a User object. This can be:
 * * A User object
 * * A Snowflake
 * * A Message object (resolves to the message author)
 * * A GuildMember object
 * @typedef {User|Snowflake|Message|GuildMember} UserResolvable
 */
const {
  Client,
  Collection,
  ClientOptions,
  ClientApplication,
} = require('discord.js');
const Console = require('../util/console');
const glob = require('glob');
const axios = require('axios');
const { readdir, readdirSync } = require('fs');
const ascii = require('ascii-table');
let table = new ascii('Events');
let table2 = new ascii('Player events');
table.setHeading('Events', 'Load status');
table2.setHeading('PLayer events', 'Load status');
const mongoose = require('mongoose');
const Util = require('./Util');
const Command = require('./Command');
// eslint-disable-next-line no-unused-vars
const Event = require('./Event');
const SlashCommand = require('./SlashCommand');
const { Player } = require('discord-player');
const ProcessEvent = require('../util/processEvents');
const path = require('path');
//const RestManager = require('discord.js/src/rest/RESTManager');
/**
 * @typedef KiwiiClientOptions 
 * @property {string} prefix The prefix of the bot 
 * @property {NodeRequire} config The config file
 * @property {ClientOptions} [clientOptions] The client options of discord.js
 * @property {string[]} [disabledEvents] The events that should not be loaded
 * @property {string|string[]} [owners] The owners of the bot
 */
/**
 * Represents a discord client
 * @extends Client
 */
class KiwiiClient extends Client {
  /**
   * Kiwiiclient
   * @param {KiwiiClientOptions} options The options passed trough the client
   */
  constructor(options) {
    super(options.clientOptions || {});
    /**
     * * A collection of all the bot's commands
     * @type {Collection<string, Command>}
     */
    this.commands = new Collection();
    /**
     * A collection of all the bot's command aliases
     * @type {Collection<string, string>}
     */
    this.aliases = new Collection();
    /**
     * A collection of the cooldown of the bot
     * @type {Collection}
     */
    //this.cooldowns = new Collection();
    /**
     * Categories of the commands
     * @type {SetConstructor}
     */
    this.categories = new Set();
    /**
     * A collection of all the slash bot's commands
     * @type {Collection<string, SlashCommand>}
     */
    this.slashs = new Collection();

    /**
     * A collection of all the events
     * @type {Collection<string, Event>}
     */
    this.events = new Collection();

    /**
     * The manager of the `Util` class
     * @type {Util}
     */
    this.utils = new Util(this);

    // Client variables
    /**
     * The bot configuration file, empty if no file was specified
     * @type {import('../../types').Config}
     */
    this.config = options.config ? options.config : {};
    /**
     * The bot owner(s)
     * @type {string|string[]}
     */
    this.owners = options.owners;
    /**
     * Access to the prefix easily
     * @type {String}
     */
    this.prefix = options.prefix;
    /**
     * The events that should not be executed
     * @type {Object}
     */
    this.disabledEvents = options.disabledEvents;

    // this.rest = new RestManager(this);

    Console.success(
      `Client has been initialized, you're using ${process.version}`
    );

    Number.prototype.padLeft = function (base, chr) {
      var len = String(base || 10).length - String(this).length + 1;
      return len > 0 ? new Array(len).join(chr || '0') + this : this;
    };

    Array.prototype.remove = function () {
      var what,
        a = arguments,
        L = a.length,
        ax;
      while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
        }
      }
      return this;
    };
    /**
     * The player function of the client
     * @type {Player}
     */
    this.player = new Player(this, {
      autoSelfDeaf: false,
      quality: 'high',
      enableLive: true,
      leaveOnEnd: true,
      leaveOnEndCooldown: 45000,
      leaveOnEmpty: true,
      leaveOnEmptyCooldown: 5000,
    });

    /**
     * Get the emojis in config
     */
    this.emotes = this.config.emojis;

    /**
     * Get the filters in config
     */
    this.filters = this.config.filters;

    this.fetchApplication().then((app) => (this.application = app));
  }
  /**
   * Log the client in
   * @param {String} token The token used to log
   * @returns
   */
  login(token = this.config.discord.token) {
    //Log super in with the supplied token
    super.login(token);

    //Return this client to allow chaining of function calls
    return this;
  }
  /**
   * Load all commands in the specifed directory
   */
  loadCommands() {
    let files = glob.sync('src/commands/**/*.js');
    const exclude = this.config.discord.dev.exclude_cmd;
    const include = this.config.discord.dev.include_cmd;
    if (this.config.discord.dev.active) {
      if (include.length) {
        files = files.filter((file) => include.includes(path.parse(file).base));
      }
      if (exclude.length) {
        files = files.filter(
          (file) => !exclude.includes(path.parse(file).base)
        );
      }
    }
    files.forEach((file) => {
      try {
        const file_path = `${process.cwd()}${path.sep}${file}`;
        /**
         * @type {Command}
         */
        let command = require(file_path);
        if (this.utils.isClass(command)) {
          command = new (require(file_path))(this);
          if (this.commands.has(command.help.name)) {
            console.error(
              new Error(`Command name duplicate: ${command.help.name}`).stack
            );
            return process.exit(1);
          }
          this.commands.set(command.help.name, command);
          if (command.help.category === '' || !command.help.category)
            command.help.category = 'unspecified';
          //if(command.help.category.includes('-')) command.help.category.replace(/-/g, ' ')
          this.categories.add(command.help.category);
          if (command.config.aliases) {
            command.config.aliases.forEach((alias) => {
              if (this.aliases.has(alias)) {
                console.error(
                  new Error(`Alias name duplicate: ${command.config.aliases}`)
                    .stack
                );
                return process.exit(1);
              } else {
                this.aliases.set(alias, command);
              }
            });
          }
        } else {
          command = null;
        }
      } catch (error) {
        console.log(error);
      }
    });
    setTimeout(
      (commands) => {
        Console.success(`Loaded ${commands} commands`);
      },
      1000,
      this.commands.size
    );
    return this;
  }
  /**
   * Load all events in the specified directory
   */
  loadEvents() {
    readdir('src/events', (err, files) => {
      if (err) throw err;
      if (this.disabledEvents.length) {
        for (const event of this.disabledEvents) {
          files = files.filter((file) => !file.startsWith(event));
        }
      }
      files = files.filter((file) => file.endsWith('.js'));
      files.forEach((file) => {
        /**@type {Event} */
        let event = require(`../events/${file}`);
        if (this.utils.isClass(event)) {
          event = new event(this);
          this.events.set(event.name, event);
          event.emitter[event.type](event.name, (...args) =>
            event.execute(...args)
          );
          if (event.name) {
            table.addRow(event.name, 'Ready');
          } else {
            table.addRow(event.name, '\x1b[31mERR!\x1b[0m');
          }
        }
      });
      console.log(table.toString());
    });
    return this;
  }
  /**
   * Connection to the database
   */
  mongoInit() {
    mongoose
      .connect(this.config.database.URI, this.config.database.config)
      .then(() => {
        Console.success(`Connected to Mongodb`, 'Mongodb');
      })
      .catch((err) => {
        Console.error('Failed to connect to Mongodb', err);
      });
  }
  /**
   * Load all player events in the specified directory
   */
  playerInit() {
    const player = readdirSync('src/events/player').filter((file) =>
      file.endsWith('.js')
    );
    for (const file of player) {
      const event = require(`../../src/events/player/${file}`);
      const eventName = file.split('.')[0];
      this.player.on(eventName, event.bind(null, this));
      if (eventName) {
        table2.addRow(eventName, 'Ready');
      } else {
        table2.addRow(eventName, '\x1b[31mERR!\x1b[0m');
      }
    }
    console.log(table2.toString());
    return this;
  }
  /**
   * Listener for process events.
   * @param {...string} events The process event name to listen to
   * @param {ProcessEventConfig} config The configuration for the process events.
   * @param {Boolean} config.log_on_console Logs the error on the console
   * @param {Boolean} config.nologs No error sended both on the channel & the console
   * @param {Boolean} config.logsonboth Logs the error on the console & the channel
   * @returns {void}
   */
  listentoProcessEvents(events = [], config = {}) {
    if (!Array.isArray(events)) {
      throw new Error('Event must be an array!');
    }

    if (typeof config !== 'object') {
      config = {};
    }

    for (const event of events) {
      process.on(event, (...args) => {
        if (
          config.log_on_console &&
          typeof config.log_on_console === 'boolean'
        ) {
          return console.error(args[0].stack);
        } else if (config.nologs && typeof config.nologs === 'boolean') {
          return;
        } else if (
          config.logsonboth &&
          typeof config.logsonboth === 'boolean'
        ) {
          if (args[0].message === 'Unknown User') return;
          console.error(args[0].stack);
          return ProcessEvent(event, args, this);
        } else {
          return ProcessEvent(event, args, this);
        }
      });
    }
  }
  /**
   * Function to start the bot
   */
  start() {
    //Load the events, player events and commands
    this.playerInit().loadEvents().loadCommands();

    //Mongodb
    if (this.config.database.enable) {
      this.mongoInit();
    } else {
      mongoose.disconnect();
      Console.warn(
        'Database is not enabled! Some commands may cause dysfunctions, please active it in the config.json!'
      );
    }
    return this;
  }
  /**
   * Checks whether a user is an owner of the bot (in {@link KiwiiClientOptions.owners})
   * @param {UserResolvable} user - User to check for the ownership
   * @returns {boolean}
   */
  isOwner(user) {
    if (!this.owners) return false;
    user = this.users.resolve(user);
    if (!user) throw new RangeError('Unable to resolve the user.');
    if (typeof this.owners === 'string') return user.id === this.owners;
    if (this.owners instanceof Array) return this.owners.includes(user.id);
    if (this.options.owner instanceof Set) return this.owners.has(user.id);
    throw new RangeError('The client\'s "owner" option is an unknown value.');
  }
  /**
   * Fetch the user via the api to get their properties.
   * @param {UserResolvable} user - User to fetch via the api.
   * @returns {Promise<object>}
   */
  async fetchUserViaAPI(user) {
    user = this.users.resolve(user);
    if (!user) throw new RangeError('Please, give me a valid user to resolve.');
    const data = await axios.get(
      `https://discord.com/api/v9/users/${user.id}`,
      {
        headers: {
          Authorization: `Bot ${this.token}`,
        },
      }
    );
    return data;
  }
}

module.exports = KiwiiClient;
