const { MessageEmbed } = require("discord.js");
const moment = require('moment');
require("moment-duration-format");

module.exports = {
	name: 'userinfo',
	aliases: ['ui'],
	description: 'Shows informations about you or a user',
	category: 'Infos',
	utilisation: '{prefix}userinfo <member>',
	async execute(client, message, args) {
    const member = await await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
    || message.member;
		const embeduser = new MessageEmbed()
      .addField('Membre', member, true)
      .addField('Nom et tag', member.user.tag, true)
      .addField('Nickname', member.nickname ? `${member.nickname}` : 'Ne possède pas de nick', true)
      .addField('Date de création du compte', moment(member.user.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Date d\'arrivée sur le serveur', moment(member.joinedAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Date de début de boost', member.premiumSince ? moment(member.premiumSince).format('[Le] DD/MM/YYYY [à] HH:mm:ss') : 'Ne boost pas', true)
      .addField('Infractions', client.db_warns.warns[member.id] ? client.db_warns.warns[member.id].length : 'Aucune', true)
      .addField('Presence', member.presence.status, true)
      .addField(`Rôles`, member.roles.cache.map(r => `${r}`).join(' | '), false)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addField (`Rôle le plus haut`, `${member.roles.highest.name !== '@everyone' ? `${member.roles.highest.name}` : 'None'}`, true)
      //.addField(`Hoist Role: `, `${member.hoistRole /*? member.hoistRole.name : 'None'*/}` ,true)
      .setFooter(`ID : ${member.id}`)
      .setColor(member.displayHexColor)
    message.channel.send(embeduser);
	},
};
