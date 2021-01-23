const Discord = require("discord.js");
const config = require('./config.json');

const client = new Discord.Client();
const fs = require("fs")
client.login(config.token);

client.commands = new Discord.Collection();

//Load the command
fs.readdir("./command_refactor/", (err, files) => {
  files.filter(file => file.endsWith('.js')).forEach((file) => {
    const command = require(`./command_refactor/${file}`);
    client.commands.set(command.name,command);
  });
});

//Verifix the prefix and execute the command
client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(client,message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});