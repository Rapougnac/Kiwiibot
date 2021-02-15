const Discord = require("discord.js");
const moment = require('moment');
require("moment-duration-format");

module.exports = {
	name: 'serverinfo',
	aliases: ['si'],
	description: '',
	category: 'Infos',
	utilisation: '{prefix}serverinfo',
	async execute(client, message, args) {

		//var highestRole = message.guild.roles.cache.map(role => role.toString()).slice(1).reverse()[0]

		const { guild } = message
		const { afkTimeout } = guild
		const botcount = message.guild.members.cache.filter(member => member.user.bot).size;
		const humancount = message.guild.members.cache.filter(member => !member.user.bot).size;
		const embedserv = new Discord.MessageEmbed()
			.addField('Nom', message.guild.name, true)
			.addField('Région', message.guild.region, true)
			.addField('Membres', `${message.guild.memberCount} membres\n${humancount} humains\n${botcount} bots`, true)
			.addField('Salons', `${message.guild.channels.cache.size} salons\n${message.guild.channels.cache.filter(channel => channel.type === 'text').size} salons textuels\n${message.guild.channels.cache.filter(channel => channel.type === 'voice').size} salons vocaux\n${message.guild.channels.cache.filter(channel => channel.type === 'category').size} catégories`, true)
			.addField('Emojis', `${message.guild.emojis.cache.size} emojis\n${message.guild.emojis.cache.filter(emoji => !emoji.animated).size} emojis statiques\n${message.guild.emojis.cache.filter(emoji => emoji.animated).size} emojis animés`, true)
			.addField('Rôles', message.guild.roles.cache.size, true)
			.addField('Propriétaire', `<@!${message.guild.ownerID}>`, true)
			.addField('Bannière', message.guild.discoverySplash ? `${message.guild.discoverySplash}` : 'Il n\'y a pas de bannière', true)
			.addField('Date de création', moment(message.guild.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
			.addField('Nitro boost', `Tier : ${message.guild.premiumTier}\nNombre de boosts : ${message.guild.premiumSubscriptionCount}`, true)
			.addField('Temps d\'afk', afkTimeout+'s', true)
			.setFooter(`ID : ${message.guild.id}`)
			.addField(`Rôle le plus haut`, `<@&${message.guild.roles.highest.id}>`, true)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setImage(message.guild.bannerURL())
		message.channel.send(embedserv)
	},
};
