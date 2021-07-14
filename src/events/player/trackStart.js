module.exports = (client, message, track) => {
    const msg = message.guild.i18n.__mf("player.events.trackStart",{emote: client.emotes.music,title: track.title,voice_channel: message.member.voice.channel.name});
    message.channel.send(msg);
};