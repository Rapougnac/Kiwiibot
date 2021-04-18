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
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase())

        // const allMembers = message.guild.members.cache
        // .filter(member => {
        //     member.roles.cache.get(role.id)
        // })
        // /*.cache*/.map(m => {
        //     return `${m.user.tag}${(m.user.bot ? ' [BOT]' : '')}`
        // }).sort((a, b) => a.localeCompare(b)).join(', ')
        const str = message.guild.roles.cache.get(role).members.map(m => m.user.tag);
        //const str = message.guild.members.fi
        //if(!allMembers) return message.channel.send('There are no members in that role!')
        const allMembers = message.guild.roles.cache.get(role).members.map((m) => {
            return `${m.user.tag}${(m.user.bot ? " [BOT]" : "")}`
        }).sort((a, b) => a.localeCompare(b)).join(', ')

        if(allMembers.length > 2048) return message.channel.send('Too much members in that role! I couldn\'t send the information!');

        const embed = new MessageEmbed()
            .setAuthor(`${role.name} (${role.id})`, message.guild.iconURL())
            .setColor(role.hexColor)
            .setDescription(`\`\`\`css\n${allMembers}\`\`\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
        return message.channel.send(`All members with the **${role.name}** role!`, { embed: embed });
    },
};