const Discord = require("discord.js");
const config = require('./config.json');
const glob = require('glob');
const { Player } = require('discord-player');

const ascii = require('ascii-table');
let table = new ascii("Commands");
table.setHeading('Command', ' Load status');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const { YTSearcher } = require('ytsearcher');
const searcher = new YTSearcher({
  key: config.ytsearcher.key,
  revealed: true
});
const client = new Discord.Client();
const fs = require("fs");
const { re } = require("mathjs");

//Xp database
const adapters = new FileSync('db_xp.json');

//client initalization
client.login(config.discord.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = config;
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.player = new Player(client);
client.db_warns = require('./db_warns.json');
client.db_xp = low(adapters);
client.db_xp.defaults({ histoires: [], xp: [] }).write();

//Load the events
fs.readdir("./events/", (err, files) => {
  files = files.filter(file => file.endsWith('.js'));
  files.forEach((file) => {
    console.log(`Loading discord.js event ${file}`);
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  });
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
      if (config.discord.dev.exclude_cmd.length) {
        files = files.filter(file => file.endsWith(config.discord.dev.include_cmd));
      }
      if (config.discord.dev.exclude_cmd.length) {
        files = files.filter(file => !file.endsWith(config.discord.dev.exclude_cmd));
      }
    }
    files.forEach((file) => {
      //console.log(`Loading discord.js command ${file}`);
      const command = require(`./${file}`);

      if (command.name) {
        client.commands.set(command.name, command);
        table.addRow(file, '✅')
      } else {
        table.addRow(file, '❌ -> Missing a name, or name is not a string.')

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

//Add Xp to user
client.on('message', message => {

  let msgauthor = message.author.id

  if (message.author.bot) return;

  if (!client.db_xp.get("xp").find({ user: msgauthor }).value()) {
    client.db_xp.get("xp").push({ user: msgauthor, xp: 1 }).write();
  } else {
    var userxpdb = client.db_xp.get("xp").filter({ user: msgauthor }).find("xp").value();
    console.log(userxpdb)
    var userxp = Object.values(userxpdb)
    console.log(userxp)
    console.log(`Nombre d'xp: ${userxp[1]}`)

    client.db_xp.get("xp").find({ user: msgauthor }).assign({ user: msgauthor, xp: userxp[1] += 1 }).write();

  }
});
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

