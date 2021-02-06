const { MessageEmbed } = require('discord.js');

module.exports = async (client, channel) => {

    const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: 'CHANNEL_DELETE'
    });

    const latestChannelDeleted = fetchGuildAuditLogs.entries.first();
    const { executor } = latestChannelDeleted;

    const embed = new MessageEmbed()
        .setAuthor(`Suppression d'un channel`)
        .setColor('#dc143c')
        .setDescription(`**Action**: suppression d'un channel\n**Nom du channel**: ${channel.name}`)
        .addField('**Type de channel**:', channel.type)
        .addField('**ID**:', channel.id)
        .setTimestamp()
        .setFooter(executor.username, executor.displayAvatarURL())
    channel.guild.channels.cache.get('786674142719377408').send(embed)
};