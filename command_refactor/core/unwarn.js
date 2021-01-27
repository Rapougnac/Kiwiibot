const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: 'uwarn',
    aliases: [],
    description: 'Ban a person',
    category: 'Core',
    utilisation: '{prefix}uwarn <mention> <raison>',
    execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à unwarn.')
        if (!client.db_warns.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn.')
        const warnIndex = args[2] - 1
        if (warnIndex < 0 || !client.db_warns.warns[member.id][warnIndex]) return message.channel.send('Ce warn n\'existe pas.')
        const { reason } = client.db_warns.warns[member.id].splice(warnIndex, 1)[0]
        if (!client.db_warns.warns[member.id].length) delete client.db_warns.warns[member.id];
        fs.writeFileSync('../../db_warns.json', JSON.stringify(client.db_warns));
        message.channel.send(`${member} a été unwarn pour ${reason} !`);
    },
};
