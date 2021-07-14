module.exports = (client, message, query, tracks, content, collector) => {
    const msg = message.guild.i18n.__mf("player.events.searchInvalidResponse",{emote: client.emotes.error, number: tracks.length});
    message.channel.send(msg);
};