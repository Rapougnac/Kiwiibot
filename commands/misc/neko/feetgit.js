const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'feetgif',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}feetgif',
	execute(client, message, args) {
		const GIF =  neko.nsfw.feetGif();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random feet gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};