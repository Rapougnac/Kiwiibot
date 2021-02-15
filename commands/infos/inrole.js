const { MessageEmbed } = require("discord.js");
const moment = require('moment');
require("moment-duration-format");
const Client = 'tets'
module.exports = {
    name: 'inrole',
    aliases: ['ir'],
    description: 'Shows all the members who has the mentionned role',
    category: 'Infos',
    utilisation: '{prefix}inrole <role>',
    async execute(client, message, args) {
        const role = message.mentions.roles.first();

        const allMembers = message.members.cache.map(m => {
            return `${m.user.tag}${(m.user.bot ? ' [BOT]' : '')}`
        }).sort((a, b) => a.localeCompare(b)).join(', ')

        if(!allMembers) return message.channel.send('There are no members in that role!')

        if(allMembers.length > 2048) return message.channel.send('Too much members in that role! I couldn\'t send the information!');

        const embed = new MessageEmbed()
            .setAuthor(`${role.name} (${role.id})`, message.guild.iconURL())
            .setColor(role.hexColor)
            .setDescription(`\`\`\`css\n${allMembers}\`\`\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
        return message.channel.send(`All members with the **${role.name}** role!`, {embed: embed});
    },
};