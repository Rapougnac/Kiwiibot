const Discord = require("discord.js");

module.exports = {
    name: 'avatar',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}avatar',
    async execute(client, message, args) {
        try {
            let user = !message.mentions.users.first() ? message.author : message.mentions.users.first();

            let embed = new Discord.MessageEmbed()
                .setTitle(`Avatar de ${user.username}!`)
                //.setDescription(`Avatar of **${user.username}#${user.discriminator}**\nIf the image is not displayed, [click here](${user.avatarURL})`)
                .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }))
                .setColor(0xFFFFFF)
                .setURL(`${user.displayAvatarURL}`)
            message.channel.send(embed);
        } catch (err) {
            message.channel.send(err);
        }
    },
};
