module.exports = (client, message, queue, track) => {
    const msg = message.guild.i18n.__mf("player.events.trackAdd",{emote: client.emotes.music, music: track.title});
    message.channel.send(msg);
};