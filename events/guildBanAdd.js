const { MessageEmbed } = require('discord.js');

module.exports = async (client, member) => {

    const fetchGuildAuditLogs = await client.guilds.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD'
    });

    const latestBannedMember = fetchGuildAuditLogs.entries.first();
    const { executor } = latestBannedMember;

    const embed = new MessageEmbed()
        .setAuthor(`Banissement de quelqu'un`)
        .setColor('#dc143c')
        .setDescription(`**Action**: banissement de quelqu'un\n**Nom de la personne**: ${member.username}`)
        .addField('**ID**:', member.id)
        .addField('**Raison**:', fetchGuildAuditLogs.entries.first().reason)
        .setTimestamp()
        .setFooter(executor.username, executor.displayAvatarURL())
    member.guild.channels.cache.get('786674142719377408').send(embed)
};