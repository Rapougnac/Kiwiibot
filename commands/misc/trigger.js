const Discord = require("discord.js");
const canva = require('canvacord');

module.exports = {
    name: 'trigger',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}join',
    async execute(client, message, args) {
        const avatar = message.author.displayAvatarURL({ dynamic: false, format: "png" });

        const image = await canva.Canvas.trigger(avatar);

        const triggered = new Discord.MessageAttachment(image, "triggered.gif");

        message.channel.send(triggered);
    },
};
