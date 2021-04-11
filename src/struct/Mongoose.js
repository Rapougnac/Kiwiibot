const mongoose = require("mongoose")
const { Client } = require("discord.js")
const consoleUtil = require("../util/console")
module.exports = class Mongoose {
  /**
    * @param {Client} client 
    */
  constructor(client) {
    Object.defineProperty(this, "client", { value: client })
    this.db = mongoose
    this.connected = false
    this.db.connection.on("connected", () => {
      this.connected = true
    })
    this.db.connection.on("disconnect", () => {
      this.connected = false
    })
  }
  init() {
    //     this.db.connect(client.database.URI, {
    //       useFindAndModify: false,
    //       useUnifiedTopology: true,
    //       useNewUrlParser: true,
    //       autoIndex: false,
    //       poolSize: 5,
    //       family: 4,
    //     }).then(() => {
    //         consoleUtil.success("Connected to Mongodb");
    //   }).catch(err => {
    //         consoleUtil.error("Failed to connect to MongoDB " + err);
    //     })
    this.db.connect(client.database.URI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
      poolSize: 5,
      family: 4,
    }).catch((error) => {
        consoleUtil.error(error.message, 'db');
    });
    this.db.Promise = global.Promise;

    this.db.connection.on("connected", () => {consoleUtil.success('Connected to MongoDB!')});
    return this.db;
  };
};
