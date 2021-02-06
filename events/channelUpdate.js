const { MessageEmbed } = require('discord.js');

module.exports = async (client, channel) => {

    const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: 'CHANNEL_UPDATE'
    });

    const latestChannelUpdated = fetchGuildAuditLogs.entries.first();
    const { executor } = latestChannelUpdated;

    const embed = new MessageEmbed()
        .setAuthor(`Modification d'un salon`)
        .setColor('#FF7F50')
        .setDescription(`**Action**: modification d'un salon\n**Nom du salon**: ${channel.name}`)
        .addField('**Type de channel**:', channel.type)
        .addField('**ID**:', channel.id)
        .addField('**NSFW**:', channel.nsfw ? `Yes` : 'No')
        .setTimestamp()
        .setFooter(executor.username, executor.displayAvatarURL())
    channel.guild.channels.cache.get('786674142719377408').send(embed)
};