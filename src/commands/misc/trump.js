const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const fetch = require('node-fetch')
module.exports = {
    name: 'trump',
    aliases: [],
    description: '',
    category: 'misc',
    utilisation: '{prefix}trump',
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
        const query = args.join(' ');
        const data = await fetch(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${encodeURIComponent(query)}`).then((res) => res.json());
        message.channel.send(new MessageEmbed().setImage(data.message))
    }
};