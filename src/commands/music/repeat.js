module.exports = {
    name: 'repeat',
    aliases: ['rep', 'r'],
    category: 'music',
    description: 'Enable or disable repeat mode for the server (play the queue again and again)',
    utilisation: '{prefix}repeat',

    async execute(client, message,args) {
        if (!message.member.voice.channel) return message.channel.send(
            message.guild.i18n.__mf("player.common.not_in_channel",{emote: client.emotes.error})
        );

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(
            message.guild.i18n.__mf("player.common.not_in_same_channel",{emote: client.emotes.error})
        );

        if (!client.player.getQueue(message)) return message.channel.send(
            message.guild.i18n.__mf("player.common.no_music_playing",{emote: client.emotes.error})
        );

        if (client.player.getQueue(message).repeatMode) {
            client.player.setLoopMode(message, false);
            return message.channel.send(message.guild.i18n.__mf("repeat.disabled",{emote: client.emotes.success}));
        } else {
            client.player.setLoopMode(message, true);
            return message.channel.send(message.guild.i18n.__mf("repeat.enabled",{emote: client.emotes.success}));
        }
    },
};