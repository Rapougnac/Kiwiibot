const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'pussy',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}pussy',
	execute(client, message, args) {
		const GIF = await neko.nsfw.pussy();
		const embed = new Discord.MessageEmbed()
		  .setColor('#202225')
		  .setTitle(`${message.author.tag} here's a random pussy image/gif`)
		  .setImage(GIF.url)
		message.channel.send(embed);
	},
};