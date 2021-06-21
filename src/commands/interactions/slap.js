const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'slap',
	aliases: [],
	description: '',
	category: 'interactions',
	utilisation: '{prefix}slap',
	async execute(client, message, args) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().startsWith(args.join(' ').toLowerCase())) || message.guild.members.cache.find(r => r.displayName.toLowerCase().startsWith(args.join(' ').toLowerCase()));
		if (!member) {
			const GIF = await neko.sfw.slap();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} slapped themsselves`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
		else {
			const GIF = await neko.sfw.slap();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} slapped ${member.user.tag}`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
	},
};

