const Discord = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
    name: 'lyrics',
    aliases: [],
    description: '',
    category: 'Music',
    utilisation: '{prefix}lyrics',
    async execute(client, message, args) {
        //const args = message.content.slice(prefix.length + (6)).trim().split(/ +/g);
        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle(':x: Song title not provided!')
            return message.channel.send(embed)
        }
        const lyrics = await lyricsFinder(args.join(' ')) || "Not Found!";
        for (let i = 0; i < lyrics.length; i += 2000) {
            const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 2000));
            const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(toSend)
            message.channel.send(embed).catch(e => {
                console.log(e)
            });
        }
    },
};
