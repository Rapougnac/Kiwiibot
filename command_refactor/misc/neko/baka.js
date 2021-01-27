const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'baka',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}baka',
	execute(client, message, args) {
		if (message.mentions.members.size === 0) {
			const GIF =  neko.sfw.baka();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} said baka to him/herself`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
		const member = message.mentions.members.first();
		const GIF =  neko.sfw.baka();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} said baka to ${member.user.tag}`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
