const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'kiss',
	aliases: [],
	description: '',
	category: 'Interactions',
	utilisation: '{prefix}kiss',
	async execute(client, message, args) {
		if (message.mentions.members.size === 0) {
			const GIF = await neko.sfw.kiss();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} kissed themsselves`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
		else {
			const member = message.mentions.members.first();
			const GIF = await neko.sfw.kiss();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} kissed ${member.user.tag}`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
	},
};

