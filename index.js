const consoleUtil = require(`./src/util/console`)
const Client = require("./src/struct/Client")
const client = new Client({
  config: "./config.json",
  clientOptions: {
    disableMentions: "everyone", //disables, that the bot is able to send @everyone
    partials: ["MESSAGE", "CHANNEL", "REACTION"], //creating the client with partials, so you can fetch OLD messages
  },
});
const mongoose = require("mongoose")

//client initalization
client.login(client.config.discord.token);
//Load the player events
client.playerInit("src/events/player");
//Load the commands
client.loadCommands("src/commands");
//Load the events
client.loadEvents("src/events");
//Mongodb
if (client.config.database.enable) {
  client.mongoInit(mongoose);
} else {
  mongoose.disconnect();
  consoleUtil.warn(
    "Database is not enabled! Some commands may cause dysfunctions, please active it in the config.json!"
  );
};