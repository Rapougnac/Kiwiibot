const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const Canvas = require('../../struct/Canvas');
const path = require('path');
const { loadImage } = require('canvas')
//const _x = require('../../assets/images/TrumpApi.png')
module.exports = {
    name: 'trump',
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
        // const base = await loadImage('../../assets/images/TrumpApi.png')
        // console.log(base);
    },
};