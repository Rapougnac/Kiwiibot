const Discord = require("discord.js");
const fs = require("fs");
const moment = require('moment');
require("moment-duration-format");

module.exports = {
    name: 'infractions',
    aliases: ['inf'],
    description: 'See the infractions of a user',
    category: 'Core',
    utilisation: '{prefix}infractions',
    async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.');
        const member = message.mentions.members.first();
        if (!member) return message.channel.send('Veuillez mentionner le membre dont voir les warns.');
        if (!client.db_warns.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn.');
        const embedinf = new Discord.MessageEmbed()
          .setDescription(`**Total de warns :** ${client.db_warns.warns[member.id].length}\n\n__**10 derniers warns**__\n\n${client.db_warns.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`)
        message.channel.send(embedinf);
    },
};
