const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'cuddle',
	aliases: [],
	description: '',
	category: 'Interactions',
	utilisation: '{prefix}cuddle',
	async execute(client, message, args) {
		if (message.mentions.members.size === 0) {
			const GIF = await neko.sfw.cuddle();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} cuddled themsselves`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
		else {
			const member = message.mentions.members.first();
			const GIF = await neko.sfw.cuddle();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} cuddled ${member.user.tag}`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
	},
};
