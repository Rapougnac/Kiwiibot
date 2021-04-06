import { Client, Collection } from "discord.js";
import config, { discord, database } from "./src/config.json";
import lang from "./src/language";
import glob from "glob";
import { Player } from "discord-player";
import { error, success, warn } from `./src/util/console`;
import ascii from "ascii-table";
let table2 = new ascii("Events");
let table3 = new ascii("PLayer Events");
table2.setHeading("Events", "Load status");
table3.setHeading("Player Events", "Load status");
import "colors";
const client = new Client({
  disableEveryone: true,  //disables, that the bot is able to send @everyone
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'] //creating the client with partials, so you can fetch OLD messages;
});
import { readdirSync } from "fs";
import { connect, disconnect } from "mongoose";

//client initalization
client.login(discord.token);
//All collections of the bot
["commands", "commands_path", "aliases", "cooldowns"].forEach(x => client[x] = new Collection())
client.config = config;
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.db_warns = require("./db_warns.json");
client.config.features = client.config.allowedFeatures;
client.player = new Player(client, {
  autoSelfDeaf: false,
  quality: "high",
  enableLive: true,
});
//Load the events
// fs.readdir("./src/events/", (err, files) => {
//   files = files.filter((file) => file.endsWith(".js"));
//   files.forEach((file) => {
//     const eventHandler = require(`./src/events/${file}`);
//     const eventName = file.split(".")[0];
//     client.on(eventName, (...args) => eventHandler(client, ...args));
//     if (eventName) {
//       table2.addRow(eventName, 'Ready'.trap);
//     } else {
//       table2.addRow(eventName, '\x1b[31mERR!\x1b[0m');
//     }
//   });
//   console.log(table2.toString()); //showing the table
// });
const player = readdirSync("./src/player").filter((file) => file.endsWith(".js"));

//Loading the player events
for (const file of player) {
  const event = require(`./src/player/${file}`);
  const eventName = file.split(".")[0];
  client.player.on(eventName, event.bind(null, client));
  if (eventName) {
    table3.addRow(eventName, "Ready".trap);
  } else {
    table3.addRow(eventName, '\x1b[31mERR!\x1b[0m');
  }
}
console.log(table3.toString());

//Function for get all files into directory
var recursive_readdir = function (src, callback) {
  glob(src + "/**/*", callback);
};

//Load the commands
recursive_readdir("./src/commands", function (err, files) {
  if (err) {
    _error("Error", err);
  } else {
    files = files.filter((file) => file.endsWith(".js"));
    if (discord.dev.active) {
      if (discord.dev.include_cmd.length) {
        files = files.filter((file) => file.endsWith(discord.dev.include_cmd) );
      }
      if (discord.dev.exclude_cmd.length) {
        files = files.filter((file) => !file.endsWith(discord.dev.exclude_cmd));
      }
    }
    files.forEach((file) => {
      const command = require(`./${file}`);
      client.commands.set(command.name, command);
      if (command.aliases) { command.aliases.forEach((alias) => { client.aliases.set(alias, command); }); }
    });
    success(`Loaded ${files.length} commands`)
  }
});

//Mongodb
if(database.enable) {
  connect(database.URI, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: false,
    poolSize: 5,
    family: 4,
  }).then( () =>{
    success("Connected to Mongodb");
  }).catch(err => {
    _error("Failed to connect to MongoDB " + err);
  })
} else {
  disconnect();
  warn("Database is not enabled! Some commands may cause dysfunctions, please active it in the config.json!");
};

import { findOne, findOneAndDelete } from "./src/models/PrefixSchema";

client.prefix = async function(message){
  let  customprefix;


  const data = await findOne({ GuildID: message.guild.id })
    .catch((error) => console.log(error));

    if(data){
      customprefix = data.Prefix;
    }else {
      customprefix = discord.default_prefix.toLowerCase();
    };
    return customprefix;
};

client.on('guildDelete', async (guild) => {
  findOne({ GuildID: guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
          findOneAndDelete({ GuildID: guild.id }).then(success('deleted data.'))
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