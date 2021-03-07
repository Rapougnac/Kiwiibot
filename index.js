const Discord = require("discord.js");
const config = require("./config.json");
const glob = require("glob");
const { Player } = require("discord-player");
//const db = require('quick.db');
const consoleUtil = require(`${process.cwd()}/util/console`);
const ascii = require("ascii-table");
let table2 = new ascii("Events");
let table3 = new ascii("PLayer Events");
table2.setHeading("Events", "Load status");
table3.setHeading("Player Events", "Load status");
const Anischedule = require(`./struct/Anischedule`);
const Mongoose = require("./struct/Mongoose");

const { YTSearcher } = require("ytsearcher");
const searcher = new YTSearcher({
  key: config.ytsearcher.key,
  revealed: true,
});
const client = new Discord.Client({
  disableEveryone: true,  //disables, that the bot is able to send @everyone
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'] //creating the client with partials, so you can fetch OLD messages);
});
const fs = require("fs");


//Xp database
// const adapters = new FileSync('db_xp.json');

//client initalization
client.login(config.discord.token);

client.commands = new Discord.Collection();
client.commands_path = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = config;
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.player = new Player(client);
client.db_warns = require("./db_warns.json");
client.config.features = client.config.allowedFeatures;
// client.db_xp = low(adapters);
// client.db_xp.defaults({ histoires: [], xp: [] }).write();
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user
client.anischedule = new Anischedule(client);
client.database = null;

if(config.database?.enable === true){
  client.database = new Mongoose(client, config.database)
}

//Load the events
fs.readdir("./events/", (err, files) => {
  files = files.filter((file) => file.endsWith(".js"));
  files.forEach((file) => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
    if (eventName) {
      table2.addRow(eventName, '\x1b[32mReady\x1b[0m');
    } else {
      table2.addRow(eventName, '\x1b[31mERR!\x1b[0m');
    }
  });
  console.log(table2.toString()); //showing the table
});
const player = fs
  .readdirSync("./events/player")
  .filter((file) => file.endsWith(".js"));

//Loading the player events
for (const file of player) {
  const event = require(`./events/player/${file}`);
  const eventName = file.split(".")[0];
  client.player.on(eventName, event.bind(null, client));
  if (eventName) {
    table3.addRow(eventName, "\x1b[32mReady\x1b[0m");
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
recursive_readdir("commands", function (err, files) {
  if (err) {
    console.log("Error", err);
  } else {
    files = files.filter((file) => file.endsWith(".js"));
    if (config.discord.dev.active) {
      if (config.discord.dev.include_cmd.length) {
        files = files.filter((file) =>
          file.endsWith(config.discord.dev.include_cmd)
        );
      }
      if (config.discord.dev.exclude_cmd.length) {
        files = files.filter(
          (file) => !file.endsWith(config.discord.dev.exclude_cmd)
        );
      }
    }
    files.forEach((file) => {
      const command = require(`./${file}`);
      client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach((alias) => {
          client.aliases.set(alias, command);
        });
      }
    });
    consoleUtil.success(`Loaded ${files.length} commands`)
  }
});

// client.on('ready', async () => {
//   await mongo().then((mongoose) => {
//     try{
//       console.log('Connected to mongo!')
//     } catch(e){

//     }
//     finally{
//       mongoose.connection.close();
//     }
//   });
// });
require("dotenv").config();


const Client = require(`${process.cwd()}/struct/Client`);
const configg = require(`${process.cwd()}/configg`);

const clientt = new Client(configg);
clientt.database?.init();
// const options = {
//   bypass: true,
//   log: true,
//   paths: [
//     "amethyste",
//     "anime",
//     "bot",
//     "core",
//     "info",
//     "infos",
//     "interactions",
//     "misc",
//     "moderation",
//     "music",
//     //"owner",
//     "neko",
//     "nsfw",
//   ],
// };


//clientt.loadCommands({ parent: "commands", ...options });
//client.login();
//Add Xp to user
// client.on('message', message => {

//   let msgauthor = message.author.id

//   if (message.author.bot) return;

//   if (!client.db_xp.get("xp").find({ user: msgauthor }).value()) {
//     client.db_xp.get("xp").push({ user: msgauthor, xp: 1 }).write();
//   } else {
//     var userxpdb = client.db_xp.get("xp").filter({ user: msgauthor }).find("xp").value();
//     console.log(userxpdb)
//     var userxp = Object.values(userxpdb)
//     console.log(userxp)
//     console.log(`Nombre d'xp: ${userxp[1]}`)

//     client.db_xp.get("xp").find({ user: msgauthor }).assign({ user: msgauthor, xp: userxp[1] += 1 }).write();

//   }
// });
/**
* Counter for messages received and sent by the bot
* @type {?MessageCount}
*/
client.messages = { received: 0, sent: 0 };
client.on("message", message => {

    if (message.author.id === client.user.id){
      return client.messages.sent++;
    } else {
      return client.messages.received++;
    };
});


