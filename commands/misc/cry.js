const Discord = require("discord.js");
const { gifu } = require("gifu");

module.exports = {
    name: 'cry',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}cry',
    async execute(client, message, args) {
        const result = gifu("cry");
        const shyembed = new Discord.MessageEmbed()
            .setColor('#202225')
            .setTitle(`${message.author.tag} is crying`)
            .setImage(result)
        message.channel.send(shyembed)
    },
};
