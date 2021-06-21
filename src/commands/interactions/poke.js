const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'poke',
	aliases: [],
	description: '',
	category: 'misc',
	utilisation: '{prefix}poke',
	async execute(client, message, args) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().startsWith(args.join(' ').toLowerCase())) || message.guild.members.cache.find(r => r.displayName.toLowerCase().startsWith(args.join(' ').toLowerCase()));
		if (!member) {
			const GIF = await neko.sfw.poke();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} poked themsselves`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
		else {
		const GIF = await neko.sfw.poke();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} poked ${member.user.tag}`)
			.setImage(GIF.url)
		message.channel.send(embed);
		}
	},
};

