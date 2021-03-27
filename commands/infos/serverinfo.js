const Discord = require("discord.js");
const moment = require('moment');
require("moment-duration-format");

module.exports = {
	name: 'serverinfo',
	aliases: ['si', 'servinf', 'servi', 'sinfo'],
	description: '',
	category: 'Infos',
	utilisation: '{prefix}serverinfo',
	async execute(client, message, args) {
		/**
		 * @param {Client} client the client that intitialized this
		 * @param {Message} message the message
		 * @param {Array} args args into an array
		 */
		const { guild } = message;
		const { afkTimeout } = guild
		const botcount = message.guild.members.cache.filter(member => member.user.bot).size;
		const humancount = message.guild.members.cache.filter(member => !member.user.bot).size;
		const embedserv = new Discord.MessageEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, }))
			.addField('Nom', message.guild.name, true)
			.addField('Région', message.guild.region, true)
			.addField('Membres', `${message.guild.memberCount} membres\n${humancount} humains\n${botcount} bots`, true)
			.addField(`Membres en ligne`, message.guild.members.cache.filter(({ presence }) => presence.status == "online" || presence.status == "idle" || presence.status == "dnd").size, true)
			.addField('Salons', `${message.guild.channels.cache.size} salons\n${message.guild.channels.cache.filter(channel => channel.type === 'text').size} salons textuels\n${message.guild.channels.cache.filter(channel => channel.type === 'voice').size} salons vocaux\n${message.guild.channels.cache.filter(channel => channel.type === 'category').size} catégories`, true)
			.addField('Emojis', `${message.guild.emojis.cache.size} emojis\n${message.guild.emojis.cache.filter(emoji => !emoji.animated).size} emojis statiques\n${message.guild.emojis.cache.filter(emoji => emoji.animated).size} emojis animés`, true)
			.addField(`Rôles [${message.guild.roles.cache.size - 1}]`, message.guild.roles.cache.filter(r => r.id !== message.guild.id).sort((A, B) => B.rawPosition - A.rawPosition).map(x => `${x}`).splice(0, 30).join(' | ') || '\u200b', false)
			.addField('Propriétaire', `<@!${message.guild.ownerID}>`, true)
			.addField('Date de création', moment(message.guild.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
			.addField('Nitro boost', `Tier : \`${message.guild.premiumTier}\`\nNombre de boosts : \`${message.guild.premiumSubscriptionCount}\``, true)
			.addField('Temps d\'afk', format(afkTimeout), true)
			.addField("Niveau de vérification", client.config.verificationLVL[message.guild.verificationLevel], true)
			.setFooter(`ID : ${message.guild.id}`)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
		message.channel.send(embedserv)
	},
};

/**
 * @param time convert time to HH:MM:SS
 * @returns time formatted
 */
function format(time) {
	var hrs = ~~(time / 3600);
	var mins = ~~((time % 3600) / 60);
	var secs = ~~time % 60;

	var ret = "";
	if (hrs > 0) {
		ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
	}
	ret += "" + mins + ":" + (secs < 10 ? "0" : "");
	ret += "" + secs;
	return `\`${ret}\``;
}
