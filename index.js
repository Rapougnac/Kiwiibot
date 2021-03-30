const Discord = require("discord.js");
const config = require("./config.json");
const glob = require("glob");
const { Player } = require("discord-player");
const consoleUtil = require(`${process.cwd()}/util/console`);
const ascii = require("ascii-table");
let table2 = new ascii("Events");
let table3 = new ascii("PLayer Events");
table2.setHeading("Events", "Load status");
table3.setHeading("Player Events", "Load status");
const colors = require("colors");
const { YTSearcher } = require("ytsearcher");
const searcher = new YTSearcher({
  key: config.ytsearcher.key,
  revealed: true,
});
const client = new Discord.Client({
  disableEveryone: true,  //disables, that the bot is able to send @everyone
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'] //creating the client with partials, so you can fetch OLD messages;
});
const fs = require("fs");
const mongoose = require("mongoose");


//Xp database
// const adapters = new FileSync('db_xp.json');

//client initalization
client.login(config.discord.token);

client.commands = new Discord.Collection();
client.commands_path = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.config = config;
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.player = new Player(client);
client.db_warns = require("./db_warns.json");
client.config.features = client.config.allowedFeatures;
client.ownerOnly = Boolean
// client.db_xp = low(adapters);
// client.db_xp.defaults({ histoires: [], xp: [] }).write();
//client.anischedule = new Anischedule(client);
// client.database = null;

// if (config.database?.enable === true) {
//   client.database = new Mongoose(client, config.database)
// }


//Load the events
fs.readdir("./events/", (err, files) => {
  files = files.filter((file) => file.endsWith(".js"));
  files.forEach((file) => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
    if (eventName) {
      table2.addRow(eventName, /*'\x1b[32mReady\x1b[0m'*/'Ready'.trap);
    } else {
      table2.addRow(eventName, '\x1b[31mERR!\x1b[0m');
    }
  });
  console.log(
    table2.toString()
  ); //showing the table
});
const player = fs.readdirSync("./events/player").filter((file) => file.endsWith(".js"));

//Loading the player events
for (const file of player) {
  const event = require(`./events/player/${file}`);
  const eventName = file.split(".")[0];
  client.player.on(eventName, event.bind(null, client));
  if (eventName) {
    table3.addRow(eventName, /*"\x1b[32mReady\x1b[0m"*/ "Ready".trap);
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
    consoleUtil.error("Error", err);
  } else {
    files = files.filter((file) => file.endsWith(".js"));
    if (config.discord.dev.active) {
      if (config.discord.dev.include_cmd.length) {
        files = files.filter((file) => file.endsWith(config.discord.dev.include_cmd) );
      }
      if (config.discord.dev.exclude_cmd.length) {
        files = files.filter((file) => !file.endsWith(config.discord.dev.exclude_cmd));
      }
    }
    files.forEach((file) => {
      const command = require(`./${file}`);
      client.commands.set(command.name, command);
      if (command.aliases) { command.aliases.forEach((alias) => { client.aliases.set(alias, command); }); }
    });
    consoleUtil.success(`Loaded ${files.length} commands`)
  }
});

// const ExtendedClient = require(`./struct/Client`);
// //const ExtendedClient = require(`${process.cwd()}/struct/Client`)
// const configuration = require(`./config`);
// const Client = new ExtendedClient(configuration);
// Client.database?.init();

//Mongodb
if(config.database.enable) {
  mongoose.connect(config.database.URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: false,
    poolSize: 5,
    //connectTimeoutMS: 10000,
    family: 4,
  }).then( () =>{
    consoleUtil.success("Connected to Mongodb");
  }).catch(err => {
    consoleUtil.error("Failed to connect to MongoDB " + err);
  })
} else {
  mongoose.disconnect();
  consoleUtil.warn("Database is not enabled! Some commands may cause dysfunctions, please active it in the config.json!");
};

const PrefixSchema = require("./models/PrefixSchema");

client.prefix = async function(message){
  let  customprefix;


  const data = await PrefixSchema.findOne({ GuildID: message.guild.id })
    .catch((error) => console.log(error));

    if(data){
      customprefix = data.Prefix;
    }else {
      customprefix = config.discord.default_prefix.toLowerCase();
    };
    return customprefix;
};

client.on('guildDelete', async (guild) => {
  PrefixSchema.findOne({ GuildID: guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
          PrefixSchema.findOneAndDelete({ GuildID: guild.id }).then(consoleUtil.success('deleted data.'))
      }
  })
})