const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const lang = require("./language")
const glob = require("glob");
const { Player } = require("discord-player");
const consoleUtil = require(`./src/util/console`);
const ascii = require("ascii-table");
let table2 = new ascii("Events");
let table3 = new ascii("PLayer Events");
table2.setHeading("Events", "Load status");
table3.setHeading("Player Events", "Load status");
require("colors");
const client = new Client({
  disableEveryone: true,  //disables, that the bot is able to send @everyone
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'] //creating the client with partials, so you can fetch OLD messages;
});
const { readdir, readdirSync } = require("fs");
const mongoose = require("mongoose");
const { init } = require("./src/struct/Mongo");
const { loadCommands } = require("./src/struct/loadcommands")

//client initalization
client.login(config.discord.token);
//All collections of the bot
["commands", "commands_path", "aliases", "cooldowns"].forEach(x => client[x] = new Collection())
client.config = config;
client.emotes = client.config.emojis;
client.filters = client.config.filters;
//client.db_warns = require("../db_warns.json");
client.config.features = client.config.allowedFeatures;
client.player = new Player(client, {
  autoSelfDeaf: false,
  quality: "high",
  enableLive: true,
});
//Load the events
readdir("./src/events/", (err, files) => {
  files = files.filter((file) => file.endsWith(".js"));
  files.forEach((file) => {
    const eventHandler = require(`./src/events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
    if (eventName) {
      table2.addRow(eventName, 'Ready'.trap);
    } else {
      table2.addRow(eventName, '\x1b[31mERR!\x1b[0m');
    }
  });
  console.log(table2.toString()); //showing the table
});
const player = readdirSync("./src/events/player").filter((file) => file.endsWith(".js"));
//Loading the player events
for (const file of player) {
  const event = require(`./src/events/player/${file}`);
  const eventName = file.split(".")[0];
  client.player.on(eventName, event.bind(null, client));
  if (eventName) {
    table3.addRow(eventName, "Ready".trap);
  } else {
    table3.addRow(eventName, '\x1b[31mERR!\x1b[0m');
  }
}
console.log(table3.toString());


//Load the commands
//loadCommands()
let recursive_readdir = function (src, callback) {
  glob(src + "/**/*", callback)
}
recursive_readdir("src/commands", function (err, files) {
  if (err) {
    consoleUtil.error("Error", err);
  } else {
    files = files.filter((file) => file.endsWith(".js"));
    if (config.discord.dev.active) {
      if (config.discord.dev.include_cmd.length) {
        files = files.filter((file) =>
          file.endsWith(config.discord.dev.include_cmd)
        );
      };
      if (config.discord.dev.exclude_cmd.length) {
        files = files.filter(
          (file) => !file.endsWith(config.discord.dev.exclude_cmd)
        );
      };
    };
    files.forEach((file) => {
      const command = require(`./${file}`);
      client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach((alias) => {
          client.aliases.set(alias, command);
        });
      };
    });
    consoleUtil.success(`Loaded ${files.length} commands`);
  };
});
//Mongodb
if(config.database.enable) {
  init(config, mongoose);
} else {
  mongoose.disconnect();
  consoleUtil.warn("Database is not enabled! Some commands may cause dysfunctions, please active it in the config.json!");
};
const PrefixSchema = require("./src/models/PrefixSchema");
client.on('guildDelete', async (guild) => {
  PrefixSchema.findOne({ GuildID: guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
          PrefixSchema.findOneAndDelete({ GuildID: guild.id }).then(consoleUtil.success('deleted data.'))
      }
  })
});
String.prototype.format = function () {
  let args = arguments;
  return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
          ? args[number]
          : match
          ;
  });
};