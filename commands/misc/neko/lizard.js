const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'lizard',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}lizard',
	execute(client, message, args) {
		const GIF =  neko.sfw.lizard();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random lizard image/gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
