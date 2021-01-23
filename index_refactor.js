const Discord = require("discord.js");
const config = require('./config.json');

const client = new Discord.Client();
const fs = require("fs")
client.login(config.token);

client.commands = new Discord.Collection();

//Load the events
fs.readdir("./events/", (err, files) => {
  files.forEach((file) => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  });
});

//Load the commands
fs.readdir("./command_refactor/", (err, files) => {
  files.filter(file => file.endsWith('.js')).forEach((file) => {
    const command = require(`./command_refactor/${file}`);
    client.commands.set(command.name,command);
  });
});

