const Discord = require("discord.js");

module.exports = {
    name: 'avatar',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}avatar',
    async execute(client, message, args) {
        try {
            const member = !message.mentions.users.first() ? message.author : message.mentions.users.first();

            let embed = new Discord.MessageEmbed()
                .setTitle(`Avatar de ${member.username}!`)
                .setDescription(`If the image is not displayed, [click here](${member.displayAvatarURL({ size: 2048, dynamic: true, format: "png" })})`)
                .setImage(member.displayAvatarURL({ size: 2048, dynamic: true, format: "png" }))
                .setColor(member.displayHexColor)
            message.channel.send(embed);

            
        } catch (err) {
            message.channel.send(err);
        }
    },
};
