module.exports = {
    name: 'loop',
    aliases: ['lp', 'l'],
    category: 'Music',
    description: 'enable or disable loop mode for the server (play the song again and again)',
    utilisation: '{prefix}loop',

    async execute(client, message,args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

        if (client.player.getQueue(message).repeatMode) {
            client.player.setRepeatMode(message, false);
            return message.channel.send(`${client.emotes.success} - Loop mode **disabled** !`);
        } else {
            client.player.setRepeatMode(message, true);
            return message.channel.send(`${client.emotes.success} - Loop mode **enabled** !`);
        };
    },
};