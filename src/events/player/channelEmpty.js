module.exports = (client, message, queue) => {
    message.channel.send(message.guild.i18n.__mf("player.events.channelEmpty",{emote: client.emotes.error}));
};