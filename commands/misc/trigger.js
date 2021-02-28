const Discord = require("discord.js");
const canva = require('canvacord');

module.exports = {
    name: 'trigger',
    aliases: [],
    description: 'Trigger yourself',
    category: 'Misc',
    utilisation: '{prefix}trigger',
    async execute(client, message, args) {
        const avatar = message.author.displayAvatarURL({ dynamic: false, format: "png" });

        const image = await canva.Canvas.trigger(avatar);

        //const triggered = new Discord.MessageAttachment(image);

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.name, message.author.displayAvatarURL())
            .setDescription(`<@${message.author.id}> is triggered`)
            .setImage(image.url)

        message.channel.send(embed);
    },
};
