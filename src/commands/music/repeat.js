module.exports = {
    name: 'repeat',
    aliases: ['rep', 'r'],
    category: 'Music',
    description: 'enable or disable repeat mode for the server (play the queue again and again)',
    utilisation: '{prefix}repeat',

    async execute(client, message,args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

        if (client.player.getQueue(message).repeatMode) {
            client.player.setLoopMode(message, false);
            return message.channel.send(`${client.emotes.success} - Repeat mode **disabled** !`);
        } else {
            client.player.setLoopMode(message, true);
            return message.channel.send(`${client.emotes.success} - Repeat mode **enabled** !`);
        }
    },
};