const discordTTSFR = require('discord-tts-fr');

module.exports = {
    name: 'tts',
    aliases: [],
    description: 'tts message',
    category: 'Core',
    utilisation: '{prefix}tts <message>',
    async execute(client, message, args) {
        const argsJoin = args.join(" ");
        const broadcast = client.voice.createBroadcast();
        var channelId = message.member.voice.channelID;
        var channel = client.channels.cache.get(channelId);
        channel.join().then(connection => {
            broadcast.play(discordTTSFR.getVoiceStream(argsJoin));
            const dispatcher = connection.play(broadcast);
            dispatcher.on("finish", () => channel.leave());
            
        });

    },
};