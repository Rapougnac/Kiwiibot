const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'feed',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}feed',
	execute(client, message, args) {
		if (message.mentions.members.size === 0) {
			const GIF = await neko.sfw.feed();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} feeded themsselves`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
		const member = message.mentions.members.first();
		const GIF = await neko.sfw.feed();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} feeded ${member.user.tag}`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
