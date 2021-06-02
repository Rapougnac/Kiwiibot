const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const moment = require('moment');
module.exports = {
    name: 'sendpins',
    aliases: ['sendpinned'],
    description: '',
    category: 'docs',
    utilisation: '{prefix}',
    cooldown: 5,
    nsfw: false,
    ownerOnly: false,
    adminOnly: false,
    guildOnly: false,
    permissions: [],
    clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        const pinned = (await message.channel.messages.fetchPinned()).array();
        pinned.reverse();
        let str = String();
        pinned.forEach((pin, count) => {
            str += `**${count +1}** - ${pin.url} - Auteur: ${pin.author.username}\n`;
        });
        message.channel.send(str);
    },  
};