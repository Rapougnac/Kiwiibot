const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: 'warn',
    aliases: [],
    description: 'Warn a person',
    category: 'Core',
    utilisation: '{prefix}warn [mention] [raison]',
    async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.');
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à warn.');
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn le propriétaire du serveur.');
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn ce membre.');
        const reason = args[1]
        if (!reason) return message.channel.send('Veuillez indiquer une raison.');
        if (!client.db_warns.warns[member.id]) client.db_warns.warns[member.id] = [];
        client.db_warns.warns[member.id].unshift({
            reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./db_warns.json', JSON.stringify(client.db_warns))
        const embedwar = new Discord.MessageEmbed()
            .setTitle(`**Warn**`)
            .addField(`**Utilisateur**`, `${member}`, true)
            .addField(`**Mod**`, `${message.author}`, true)
            .addField(`**Raison**`, `${reason}`, true)
        message.channel.send(embedwar);
    },
};
