const { Client, Collection } = require("discord.js")
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
   * @param {Object} options.config The path to the config file
   */
  constructor(options) {
    super(options.clientOptions || {})

    /**
     * A collection of all the bot's commands
     * @type {Collection}
     */
    this.commands = new Collection()
    /**
     * A collection of all the bot's command aliases
     * @type {Collection}
     */
    this.aliases = new Collection()
    /**
     * A collection of the cooldown of the bot
     * @type {Collection}
     */
    this.cooldowns = new Collection()

    // Client variables
    /**
     * The bot configuration file, empty if no file was specified
     * @type {Object}
     */
    this.config = options.config ? require(`../../${options.config}`) : {}

    Console.success(
      `Client has been initialized, you're using ${process.version}`
    )

    /**
     * The database connected to this bot (null if false)
     * @type {?Mongoose}
     */
    this.database = null

    if (options.database?.enable === true) {
      this.database = new Mongoose(this, options.database)
    } else {
    }

    String.prototype.format = function () {
      let args = arguments
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match
      })
    }
    /**
     * The player function of the client
     * @type {Player}
     */
    this.player = new Player(this, {
      autoSelfDeaf: false,
      quality: "high",
      enableLive: true,
    })
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
  login(token) {
    //Log super in with the supplied token
    super.login(token)

    //Return this client to allow chaining of function calls
    return this
  }
  /**
   * Load all commands in the specifed directory
   * @param {String} path The path where the commands are located
   * @returns
   */
  loadCommands(path) {
    let files = glob.sync(path + "/**/*")
    files = files.filter((file) => file.endsWith(".js"))
    files.forEach((file) => {
      const command = require(`../../${file}`)
      this.commands.set(command.name, command)
      if (command.aliases) {
        command.aliases.forEach((alias) => {
          this.aliases.set(alias, command)
        })
      }
    })
    Console.success(`Loaded ${files.length} commands`)
    return this
  }
  /**
   * Load all events in the specified directory
   * @param {String} path The path where events are located
   * @returns
   */
  loadEvents(path) {
    readdir(path, (err, files) => {
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
   * Connect to the database
   * @param {mongoose} mongoose The mongoose module
   */
  mongoInit(mongoose) {
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
   * @param {String} path The path where the player events are located
   * @returns
   */
  playerInit(path) {
    const player = readdirSync(path).filter((file) =>
      file.endsWith(".js")
    )
    for (const file of player) {
      const event = require(`../../src/events/player/${file}`)
      const eventName = file.split(".")[0]
      this.player.on(eventName, event.bind(null, this));
      if (eventName) {
        table2.addRow(eventName, "Ready");
      } else {
        table2.addRow(eventName, "\x1b[31mERR!\x1b[0m");
      };
    };
    console.log(table2.toString())
  };
};
