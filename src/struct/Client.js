const { Client, Collection, Permissions } = require("discord.js")
const Console = require("../util/console")
const glob = require("glob")
const { readdir, readdirSync } = require("fs")
const ascii = require("ascii-table")
let table = new ascii("Events")
let table2 = new ascii("Player events")
table.setHeading("Events", "Load status")
table2.setHeading("PLayer events", "Load status")
const Mongoose = require("./Mongoose")
const mongoose = require("mongoose")
const Util = require("./Util")
const { Player } = require("discord-player")
/**
 * Represents a discord client
 * @extends Client
 */
module.exports = class KiwiiClient extends Client {
  /**
   *
   * @param {Object} options The options passed trough the client
   * @param {Object} options.clientOptions The client options used by discord.js itself
   * @param {String} options.config The path to the config file
   * @param {String|String[]} options.owners The owner(s) of the bot
   * @param {String[]} options.defaultPerms The default perms of the bot
   */
  constructor(options) {
    super(options.clientOptions || {});
    
    if(typeof options !== "object") throw new TypeError("Options should be an `Object`")

    /**
     * A collection of all the bot's commands
     * @type {Collection}
     */
    this.commands = new Collection();
    /**
     * A collection of all the bot's command aliases
     * @type {Collection}
     */
    this.aliases = new Collection();
    /**
     * A collection of the cooldown of the bot
     * @type {Collection}
     */
    this.cooldowns = new Collection();

    this.utils = new Util(this);

    // Client variables
    /**
     * The bot configuration file, empty if no file was specified
     * @type {String}
     */
    this.config = options.config ? require(`../../${options.config}`) : {};
    /**
     * The bot owner(s)
     * @type {String}
     */
    this.owners = options.owners;


    if(!options.defaultPerms) throw new Error("You must pass default perm(s) for the client")
    /**
     * The default perms of the bot
     * @type {string}
     */
    this.defaultPerms = new Permissions(options.defaultPerms).freeze();



    Console.success(
      `Client has been initialized, you're using ${process.version}`
    );

    /**
     * The database connected to this bot (null if false)
     * @type {?Mongoose}
     */
    this.database = null;

    if (options.database?.enable === true) {
      this.database = new Mongoose(this, options.database)
    } else {
      // Do nothing
    }

    
    /**
     * Function to format a string
     */
    String.prototype.format = function() {
      let args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match
      });
    };

    /**
     * The player function of the client
     * @type {Player}
     */
    this.player = new Player(this, {
      autoSelfDeaf: false,
      quality: "high",
      enableLive: true,
    });
    /**
     * Get the emojis in config
     */
    this.emotes = this.config.emojis
    /**
     * Get the filters in config
     */
    this.filters = this.config.filters
  }
  /**
   * Log the client in
   * @param {String} token The token used to log
   * @returns
   */
  login(token = this.config.discord.token) {
    //Log super in with the supplied token
    super.login(token)

    //Return this client to allow chaining of function calls
    return this;
  }
  /**
   * Load all commands in the specifed directory
   */
  loadCommands() {
    let files = glob.sync("src/commands" + "/**/*")
    files = files.filter((file) => file.endsWith(".js"))
    if (this.config.discord.dev.active) {
      if (this.config.discord.dev.include_cmd.length) {
        files = files.filter((file) =>
          file.endsWith(this.config.discord.dev.include_cmd)
        )
      } else {
        // Do nothing
      }
      if (this.config.discord.dev.exclude_cmd.length) {
        files = files.filter(
          (file) => !file.endsWith(this.config.discord.dev.exclude_cmd)
        )
      } else {
        // Do nothing
      }
    } else {
      // Do nothing
    }
    files.forEach((file) => {
      const command = require(`../../${file}`)
      this.commands.set(command.name, command)
      if (command.aliases) {
        command.aliases.forEach((alias) => {
          this.aliases.set(alias, command)
        })
      } else {
        // Do nothing
      }
    })
    Console.success(`Loaded ${files.length} commands`)
    return this
  }
  /**
   * Load all events in the specified directory
   */
  loadEvents() {
    readdir("src/events", (err, files) => {
      if (err) throw err
      files = files.filter((file) => file.endsWith(".js"))
      files.forEach((file) => {
        const eventHandler = require(`../events/${file}`)
        const eventName = file.split(".")[0]
        this.on(eventName, (...args) => eventHandler(this, ...args))
        if (eventName) {
          table.addRow(eventName, "Ready")
        } else {
          table.addRow(eventName, "\x1b[31mERR!\x1b[0m")
        }
      })
      console.log(table.toString()) //showing the table
    })
    return this
  }
  /**
   * Connection to the database
   */
  mongoInit() {
    mongoose
      .connect(this.config.database.URI, {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: false,
        poolSize: 5,
        family: 4,
      })
      .then(() => {
        Console.success("Connected to Mongodb")
      })
      .catch((err) => {
        Console.error("Failed to connect to MongoDB ", err)
      })
  }
  /**
   * Load all player events in the specified directory
   */
  playerInit() {
    const player = readdirSync("src/events/player").filter((file) => file.endsWith(".js"))
    for (const file of player) {
      const event = require(`../../src/events/player/${file}`)
      const eventName = file.split(".")[0]
      this.player.on(eventName, event.bind(null, this))
      if (eventName) {
        table2.addRow(eventName, "Ready")
      } else {
        table2.addRow(eventName, "\x1b[31mERR!\x1b[0m")
      }
    }
    console.log(table2.toString())
  }
  /**
   * Function to start the bot
   */
  async start() {
    //Load the player events
    this.playerInit();
    //Load the events
    this.loadEvents();
    //Load the commands
    this.loadCommands();

    //Mongodb
    if (this.config.database.enable) {
      this.mongoInit();
    } else {
      mongoose.disconnect();
      Console.warn("Database is not enabled! Some commands may cause dysfunctions, please active it in the config.json!");
    }
  }
}