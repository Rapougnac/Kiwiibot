const config = require('../../config.json');
const { Client, Message } = require("discord.js");
module.exports = {
    name: 'reload',
    aliases: [],
    description: 'Reload the bot',
    category: 'Core',
    utilisation: '{prefix}reload',
    cooldown: 120,
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        if (!message.member.id !== "253554702858452992") return;
        client.destroy()
        client.login(config.discord.token);
        message.channel.send(`Reloaded ${client.config.emojis.success}`);
        return;
    },
};
