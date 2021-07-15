module.exports = (client, message, query) => {
    message.channel.send(message.guild.i18n.__mf("player.events.noResults",{emote: client.emotes.error,search: query}));
};