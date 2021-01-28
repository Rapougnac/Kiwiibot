const Discord = require("discord.js");

module.exports = {
    name: 'sexyrate',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}sexyrate',
    async execute(client, message, args) {
        const sexyrate = Math.floor(Math.random() * 100);
        const user = !message.mentions.users.first() ? message.author : message.mentions.users.first();
        const embed = new Discord.MessageEmbed();

        if (user == message.author) {
            embed.addField(':heart_decoration: Sexy Rate :heart_decoration: ', `I rate you a ${sexyrate} out of 100 on the sexy scale`)
        }
        else {
            embed.addField(`:heart_decoration: Sexy Rate :heart_decoration: `, `I rate ${user.tag} rated ${sexyrate} out of 100 on the sexy scale`)
        }
        return message.channel.send(embed);
    },
};
