const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const axios = require("axios");
module.exports = {
    name: 'test',
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
    clientPermissions: [],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {

    },
};