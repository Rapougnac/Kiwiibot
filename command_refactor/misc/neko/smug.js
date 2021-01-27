const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'smug',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}smug',
	execute(client, message, args) {
		const GIF =  neko.sfw.smug();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random smug image/gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
