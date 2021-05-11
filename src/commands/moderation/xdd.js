const { MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const Message = require("../../struct/Message")
module.exports = {
    name: 'a',
    aliases: [],
    description: '',
    category: '',
    utilisation: '{prefix}',
    cooldown: 5,
    nsfw: false,
    ownerOnly: false,
    adminOnly: false,
    guildOnly: false,
    permissions: [],
    clientPermissions: ["ADMINISTRATOR"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        
    },
};