const { MessageEmbed, Message, Client } = require("discord.js");
const moment = require('moment');
require("moment-duration-format");

module.exports = {
	name: 'serverinfo',
	aliases: ['si', 'servinf', 'servi', 'sinfo'],
	description: '',
	category: 'infos',
	utilisation: '{prefix}serverinfo',
	guildOnly: true,
	adminOnly: false,
	ownerOnly: false,
	permissions: [],
	clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
	string: [],
		/**
		 * @param {Client} client
		 * @param {Message} message
		 * @param {String[]} args
		 */
	async execute(client, message, args) {
		const { guild } = message;
		const { afkTimeout } = guild
		const botcount = guild.members.cache.filter(member => member.user.bot).size;
		const humancount = guild.members.cache.filter(member => !member.user.bot).size;
		const embedserv = new MessageEmbed()
			.setAuthor(guild.name, guild.iconURL({ dynamic: true, }))
			.addField(this.string[7], `<@!${message.guild.ownerID}>\n(\`${message.guild.owner.user.tag}\`)`, true)
			.addField(this.string[0], guild.name, true)
			.addField(this.string[1], guild.region, true)
			.addField(this.string[2], `${guild.memberCount} ${this.string[14]}\n${humancount} ${this.string[15]}\n${botcount} ${this.string[16]}`, true)
			.addField(this.string[3], message.guild.members.cache.filter(({presence}) => presence.status !== 'offline').size, true)
			.addField(this.string[4], `${message.guild.channels.cache.size} ${this.string[17]}\n${message.guild.channels.cache.filter(channel => channel.type === 'text').size} ${this.string[18]}\n${message.guild.channels.cache.filter(channel => channel.type === 'voice').size} ${this.string[19]}\n${message.guild.channels.cache.filter(channel => channel.type === 'category').size} ${this.string[20]}`, true)
			.addField(this.string[5], `${message.guild.emojis.cache.size} emojis\n${message.guild.emojis.cache.filter(emoji => !emoji.animated).size} ${this.string[24]}\n${message.guild.emojis.cache.filter(emoji => emoji.animated).size} ${this.string[21]}`, true)
			.addField(this.string[8], moment(message.guild.createdAt).format(`[${this.string[22]}] DD/MM/YYYY [${this.string[23]}] HH:mm:ss`), true)
			.addField(this.string[9], this.string[13].format(message.guild.premiumTier, message.guild.premiumSubscriptionCount), true)
			.addField(this.string[10], format(afkTimeout), true)
			.addField(this.string[11], client.config.verificationLVL[message.guild.verificationLevel], true)
			.addField(this.string[6].format(message.guild.roles.cache.size - 1), message.guild.roles.cache.filter(r => r.id !== message.guild.id).sort((A, B) => B.rawPosition - A.rawPosition).map(x => `${x}`).splice(0, 30).join(' | ') || '\u200b', false)
			.setFooter(this.string[12].format(message.guild.id))
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
		message.channel.send(embedserv)
	},
};

/**
 * @param time convert time to HH:MM:SS
 * @returns {String} time formatted
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
