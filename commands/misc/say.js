const Discord = require("discord.js");

module.exports = {
    name: 'say',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}say',
    async execute(client, message, args) {
        //const args = message.content.trim().substring(prefix.length).split(/ +/g);
        const botmessage = args.join(" ");
        message.delete().catch();
        message.channel.send(botmessage);
    },
};
