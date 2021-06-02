const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'baka',
	aliases: [],
	description: '',
	category: 'interactions',
	utilisation: '{prefix}baka',
	async execute(client, message, args) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase());
		if (!member) {
			const GIF = await neko.sfw.baka();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} said baka to themselves`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
		else {
			const GIF = await neko.sfw.baka();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} said baka to ${member.user.tag}`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
	},
};
