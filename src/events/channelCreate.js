const { MessageEmbed, GuildChannel, Client, DMChannel } = require('discord.js');
/**
 * 
 * @param {Client} client 
 * @param {GuildChannel|DMChannel} channel 
 * @returns 
 */
module.exports = async (client, channel) => {
    if (channel.guild.id !== "714158237406199899") return;

    const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: 'CHANNEL_CREATE'
    });
    const latestChannelCreated = fetchGuildAuditLogs.entries.first();
    const { executor } = latestChannelCreated;

    const embed = new MessageEmbed()
        .setAuthor(`Création d'un nouveau channel`)
        .setColor('#fd7aff')
        .setDescription(`**Action**: création d'un channel\n**Nom du channel**: ${channel.name}`)
        .addField('**Type de channel**:', channel.type)
        .addField('**Crée le**:', channel.createdAt)
        .addField('**ID**:', channel.id)
        .addField('**NSFW**:', channel.nsfw ? `Yes` : 'No')
        .setTimestamp()
        .setFooter(executor.username, executor.displayAvatarURL())
    //channel.guild.channels.cache.get('').send(embed)
};