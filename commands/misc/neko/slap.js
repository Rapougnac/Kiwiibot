const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'slap',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}slap',
	async execute(client, message, args) {
		if (message.mentions.members.size === 0) {
			const GIF = await neko.sfw.slap();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} slapped themsselves`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
		const member = message.mentions.members.first();
		const GIF = await neko.sfw.slap();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} slapped ${member.user.tag}`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};

