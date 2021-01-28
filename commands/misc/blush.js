const Discord = require("discord.js");
const { gifu } = require("gifu");

module.exports = {
    name: 'blush',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}blush',
    async execute(client, message, args) {
        const result = gifu("blush");
        const shyembed = new Discord.MessageEmbed()
            .setColor('#202225')
            .setTitle(`${message.author.tag} is crying`)
            .setImage(result)
        message.channel.send(shyembed)
    },
};
