module.exports = (client, message, playlist) => {
    const msg = message.guild.i18n.__mf("player.events.playlistAdd",{emote: client.emotes.music,music: playlist.title,number: playlist.items.length})
    message.channel.send(msg);
};