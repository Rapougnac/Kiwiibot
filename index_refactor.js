const Discord = require("discord.js");
const config = require('./config.json');
const glob = require('glob')
const { Player } = require('discord-player');


const client = new Discord.Client();
const fs = require("fs")
client.login(config.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.player = new Player(client);

//Load the events
fs.readdir("./events/", (err, files) => {

  files.forEach((file) => {
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
recursive_readdir('command_refactor', function (err, files) {
  if (err) {
    console.log('Error', err);
  } else {
    files.filter(file => file.endsWith('.js')).forEach((file) => {
      const command = require(`./${file}`);
      client.commands.set(command.name, command);

      if (command.aliases) {
        command.aliases.forEach(alias => {
          client.aliases.set(alias, command);
        });
      }
    });
  }

});
