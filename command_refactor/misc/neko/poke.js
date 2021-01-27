const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'poke',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}poke',
	execute(client, message, args) {
		if (message.mentions.members.size === 0) {
			const GIF = await neko.sfw.poke();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} poked themsselves`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
		const member = message.mentions.members.first();
		const GIF = await neko.sfw.poke();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} poked ${member.user.tag}`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};

