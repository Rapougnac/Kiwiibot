const Discord = require("discord.js");
const config = require('./config.json');

const client = new Discord.Client();
const fs = require("fs")
client.login(config.token);

fs.readdir("./events_refactor/", (err, files) => {
  files.forEach((file) => {
    const eventHandler = require(`./events_refactor/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  })
})