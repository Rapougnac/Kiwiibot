const Discord = require("discord.js");
const config = require('./config.json');
const glob = require('glob');
const { Player } = require('discord-player');
//const db = require('quick.db');

const ascii = require('ascii-table');
let table = new ascii("Commands");
let table2 = new ascii("Events");
table.setHeading('Command', ' Load status');
table2.setHeading("Events", "Load status");

// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');

const { YTSearcher } = require('ytsearcher');
const searcher = new YTSearcher({
  key: config.ytsearcher.key,
  revealed: true
});
const client = new Discord.Client();
const fs = require("fs");
const { re } = require("mathjs");
const { NoUnusedVariablesRule } = require("graphql");

//client initalization
client.login(config.discord.token);

client.commands = new Discord.Collection();
client.commands_path = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = config;
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.player = new Player(client);
client.db_warns = require('./db_warns.json');

//Load the events
fs.readdir("./events/", (err, files) => {
  files = files.filter(file => file.endsWith('.js'));
  files.forEach((file) => {
    console.log(`Loading discord.js event ${file}`);
    const eventHandler = require(`./events/${file}`);
    //const eventsLogs = require(`./events/logs/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
    //client.on(eventName, (...args) => eventsLogs(client, ...args));
    if (file) {
      table2.addRow(file, 'Ready')
    } else {
      table2.addRow(file, '❌')

    }
  });
  console.log(table2.toString()); //showing the table
  console.log("Logging into the BOT..."); //showing loading status")
});

//Function for get all files into directory
var recursive_readdir = function (src, callback) {
  glob(src + '/**/*', callback);
};

//Load the commands
recursive_readdir('commands', function (err, files) {
  if (err) {
    console.log('Error', err);
  } else {
    files = files.filter(file => file.endsWith('.js'));
    if (config.discord.dev.active) {
      if (config.discord.dev.include_cmd.length) {
        files = files.filter(file => file.endsWith(config.discord.dev.include_cmd));
      }
      if (config.discord.dev.exclude_cmd.length) {
        files = files.filter(file => !file.endsWith(config.discord.dev.exclude_cmd));
      }
    }
    files.forEach((file) => {
      const command = require(`./${file}`);

      if (command.name) {
        client.commands.set(command.name, command);
        client.commands_path.set(command.name, file);
        table.addRow(file, '✅')
      } else {
        table.addRow(file, '❌ -> Missing a help name, or help name is not a string.')

      }
      if (command.aliases) {
        command.aliases.forEach(alias => {
          client.aliases.set(alias, command);
        });
      }

    });
    console.log(table.toString());
  }

});
const player = fs.readdirSync('./events/player').filter(file => file.endsWith('.js'));

//Loading the player events
for (const file of player) {
  console.log(`Loading discord-player event ${file}`);
  const event = require(`./events/player/${file}`);
  client.player.on(file.split(".")[0], event.bind(null, client));
};
client.on(`message`, message => {

  if (message.content === `m?join`)
    client.emit(`guildMemberAdd`, message.member);
});
client.on(`message`, message => {

  if (message.content === `m?leave`)
    client.emit(`guildMemberRemove`, message.member);
});


client.on(`guildMemberRemove`, async member => {
  const channel = member.guild.channels.cache.get("779275678519525377");
  if (!channel) return;
  channel.send(`**${member.user.tag}** vient de quitter le serveur~ <:facepalm:770056223185567764>`)
});