const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'anime avatar',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}anime avatar',
	execute(client, message, args) {
		const GIF =  neko.sfw.avatar();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random anime avatar`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
