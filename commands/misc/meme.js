const Discord = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
    name: 'meme',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}meme',
    async execute(client, message, args) {
        //const args = message.content.slice(prefix.length).trim().split(/ +/g);
        //const args = message.content.trim().substring(prefix.length).split(/ +/g);
        const subReddits = ["dankmemes", "meme", "memes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random);

        const memeEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`Your meme. From r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)

        message.channel.send(memeEmbed);
    },
};
