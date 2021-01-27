const Discord = require("discord.js");
const canva = require('canvacord');

module.exports = {
    name: 'join',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}join',
    execute(client, message, args) {
        //const args = message.content.trim().split(/ +/g)
        const avatar = message.author.displayAvatarURL({ dynamic: false, format: "png" });

        const image = await canva.Canvas.trigger(avatar);

        const triggered = new Discord.MessageAttachment(image, "triggered.gif");

        message.channel.send(triggered);
    },
};
