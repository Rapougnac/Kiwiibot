const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const fetch = require('node-fetch');
const _ = require('lodash');
module.exports = {
    name: 'phcomment',
    aliases: ['commentph', 'ph'],
    description: 'Write a comment in ph ( ͡• ͜ʖ ͡• )',
    category: 'misc',
    utilisation: '{prefix}phcomment <user> [text]',
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
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase());
        if(User){
            const query = args.slice(1).join(' ');
            const data = await fetch(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${User.user.displayAvatarURL()}&text=${encodeURIComponent(_.upperFirst(query))}&username=${encodeURIComponent(User.user.username)}`).then((res) => res.json())
            const att = new MessageAttachment(data.message)
            message.channel.send(att);
        } else {
            const query = args.join(' ');
            const data = await fetch(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${message.author.displayAvatarURL()}&text=${encodeURIComponent(_.upperFirst(query))}&username=${encodeURIComponent(message.author.username)}`).then((res) => res.json());
            const att = new MessageAttachment(data.message)
            message.channel.send(att);
        }
    },
};