const mongoose = require("mongoose")
const consoleUtil = require("../util/console")
const Client = require("./Client")
module.exports = class Mongoose {
  /**
    * @param {Client} client The client from `./Client`
    * @param {Object} options The options passed trough the Mongoose manager
    */
  constructor(client, options = {}) {
    Object.defineProperty(this, "client", { value: client })
    /**
     * The connection URI for this instance
     * @type {string}
     */
    this.connector = options.URI;
    /**
     * The connection settings for this instance
     * @type {object}
     */
    this.settings = options.config;

    /**
     * Instance of mongoose library
     * @type {object}
     */
    this.database = mongoose;
    /**
     * Wether the client is connected to the database
     */
    this.connected = false;

    this.database.connection.on("connected", () => this.connected = true);
    this.database.connection.on("disconnect", () => this.connected = false);


  }
  /**
   * Initialize this database
   * @returns {Object<Database>}
   */
  init() {
    this.database.connect(this.connector, this.settings).catch((error) => {
      consoleUtil.error(error.message, "[Database]");
    });

    this.database.set("useFindAndModify", false);

    this.database.Promise = global.Promise;

    this.database.connection.on("connected", () => {
      consoleUtil.success("Connected to MongoDB");
    });
  }
  
};