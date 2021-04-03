const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}queue',
    cooldown: 5,
    guildOnly: true,
    adminOnly: false,
    ownerOnly: true,
    permissions: [],
    clientPermissions: ["CONNECT", "SPEAK", "USE_EXTERNAL_EMOJIS"],
    string: [],
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(this.string[0].format(client.emotes.error));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(this.string[1].format(client.emotes.error));

        const queue = client.player.getQueue(message);

        if (!client.player.getQueue(message)) return message.channel.send(this.string[2].format(client.emotes.error));

        message.channel.send(`${this.string[3].format(message.guild.name, client.emotes.queue, queue.playing.title, queue.playing.author)}` + (queue.tracks.map((track, i) => {
            return `${this.string[4].format(i + 1, track.title, track.author, track.requestedBy.username)}`
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5}` ? `${this.string[5].format(queue.tracks.length - 5)}` : `${this.string[6].format(queue.tracks.length)}`));
    },
};