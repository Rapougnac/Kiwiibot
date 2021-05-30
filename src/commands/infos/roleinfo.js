const { MessageEmbed, Permissions } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
module.exports = {
  name: 'roleinfo',
  aliases: ['ri'],
  description: 'Shows informations about the mentionned role',
  category: 'Infos',
  utilisation: '{prefix}roleinfo [role]',
  async execute(client, message, args) {
    const role = message.mentions.roles.first();
    if (!role)
      return message.channel.send(
        'Veuillez mentionner le rôle dont vous voulez voir les infos.'
      );
    let string = String();
	console.log(role.permissions)
    console.log(role.permissions.toArray());
    const permsArr = role.permissions.toArray();
    permsArr.forEach((perm) => {
      string += `\`${perm
        .toLowerCase()
        .replace(/(^|"|_)(\S)/g, (z) => z.toUpperCase())
        .replace(/_/g, ' ')
        .replace(/Use Vad/g, 'Use Voice Activity')
        .replace(/Guild/g, 'Server')}\`\n`;
    });
    message.channel.send(
      new MessageEmbed()
        .setDescription('Permissions\n' + string)
        .addField('Rôle', role, true)
        .addField('Nom du rôle', role.name, true)
        .addField('Membres le possédant', role.members.size, true)
        .addField('Couleur', role.hexColor, true)
        .addField(
          'Date de création',
          moment(role.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'),
          true
        )
        .addField('Affiché séparément', role.hoist ? 'Oui' : 'Non', true)
        .addField('Mentionnable', role.mentionable ? 'Oui' : 'Non', true)
        .setFooter(`ID : ${role.id}`)
        .setColor(role.hexColor)
    );
  },
};

