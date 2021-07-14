module.exports = (client, message, query, tracks) => {
    message.channel.send(message.guild.i18n.__mf("player.events.searchCancel",{emote: client.emotes.error}));
};