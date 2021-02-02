const Discord = require("discord.js");
const moment = require('moment');
require("moment-duration-format");

module.exports = {
	name: 'userinfo',
	aliases: ['ui'],
	description: '',
	category: 'Infos',
	utilisation: '{prefix}userinfo',
	async execute(client, message, args) {
    const member = message.mentions.members.first() || message.member
		const embeduser = new Discord.MessageEmbed()
      .addField('Membre', member, true)
      .addField('Tag', member.user.tag, true)
      .addField('Date de création du compte', moment(member.user.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Date d\'arrivée sur le serveur', moment(member.joinedAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Date de début de boost', member.premiumSince ? moment(member.premiumSince).format('[Le] DD/MM/YYYY [à] HH:mm:ss') : 'Ne boost pas', true)
      .addField('Infractions', client.db_warns.warns[member.id] ? client.db_warns.warns[member.id].length : 'Aucune', true)
      .addField(`Roles`, member.roles.cache.size, true)
      .addField('')
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(`ID : ${member.id}`)
    message.channel.send(embeduser);
	},
};
