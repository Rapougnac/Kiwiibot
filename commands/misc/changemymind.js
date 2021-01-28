const Discord = require("discord.js");
const canva = require('canvacord');
const { changemymind } = require('canvacord');

module.exports = {
    name: 'changemymind',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}changemymind',
    async execute(client, message, args) {
        const text =args;
        if (!args[0]) return message.channel.send('Veuillez mettre un texte valide');

        const image = await canva.Canvas.changemymind(text);

        const changeMyMind = new Discord.MessageAttachment(image, "cmm.png");

        message.channel.send(changeMyMind);
    },
};
