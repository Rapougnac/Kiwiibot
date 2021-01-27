const Discord = require("discord.js");

module.exports = {
	name: 'userinfo',
	aliases: [],
	description: '',
	category: 'Infos',
	utilisation: '{prefix}userinfo',
	execute(client, message, args) {
		const embeduser = new Discord.MessageEmbed()
      .addField('Membre', member, true)
      .addField('Tag', member.user.tag, true)
      .addField('Date de création du compte', moment(member.user.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Date d\'arrivée sur le serveur', moment(member.joinedAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Date de début de boost', member.premiumSince ? moment(member.premiumSince).format('[Le] DD/MM/YYYY [à] HH:mm:ss') : 'Ne boost pas', true)
      .addField('Infractions', client.db.warns[member.id] ? client.db.warns[member.id].length : 'Aucune', true)
      .addField(`Roles`, member.roles.cache.size, true)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(`ID : ${member.id}`)
    message.channel.send(embeduser);
	},
};
