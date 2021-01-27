const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'cumsluts',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}cumsluts',
	execute(client, message, args) {
		const GIF =  neko.nsfw.cumsluts();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random cumsluts image/gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
