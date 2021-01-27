const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'kiss',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}kiss',
	execute(client, message, args) {
		if (message.mentions.members.size === 0) {
			const GIF =  neko.sfw.kiss();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} kissed themsselves`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
		const member = message.mentions.members.first();
		const GIF =  neko.sfw.kiss();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} kissed ${member.user.tag}`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};

