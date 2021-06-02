const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const fetch = require('node-fetch');
module.exports = {
    name: 'yaoi',
    aliases: [],
    description: 'Get a yaoi pic (✿◕‿◕✿)',
    category: 'nsfw',
    utilisation: '{prefix}yaoi',
    cooldown: 5,
    nsfw: true,
    ownerOnly: false,
    adminOnly: false,
    guildOnly: false,
    permissions: [],
    clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        const data = await fetch('https://nekobot.xyz/api/image?type=yaoi').then((res) => res.json());

        const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }), data.message)
            .setDescription(`${message.author.username} here a yaoi pic ^^`)
            .setColor(data.color)
            .setImage(data.message);
        message.channel.send(embed);
    },
};