const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'cumart',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}cumart',
	execute(client, message, args) {
		const GIF =  neko.nsfw.cumArts();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random cumart image/gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
