
const consoleUtil = require("../util/console");
const config = require("../../config.json");
const mongoose = require("mongoose");
/**
 * 
 * @param {config} config 
 * @param {mongoose} mongoose 
 */
function init(config, mongoose) {
  mongoose
    .connect(config.database.URI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
      poolSize: 5,
      family: 4,
    })
    .then(() => {
      consoleUtil.success("Connected to Mongodb")
    })
    .catch((err) => {
      consoleUtil.error("Failed to connect to MongoDB " + err)
    })
}

module.exports = { init }
