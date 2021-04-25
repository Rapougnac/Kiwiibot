const Client = require("./src/struct/Client");
require("./src/struct/Message");
require("module-alias/register");
const client = new Client({
  defaultPerms: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  owners: "253554702858452992",
  config: "./config.json",
  clientOptions: {
    disableMentions: "everyone", //disables, that the bot is able to send @everyone
  },
});
//Client start
client.start();
//client initalization
client.login();

// TODO: Finish all the properties of the commands
// TODO: Dashboard for the bot
// FIXME: Fix Mongoose.js