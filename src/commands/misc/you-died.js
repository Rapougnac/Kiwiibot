const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const { centerImage, greyscale, drawImageWithTint } = require('../../struct/Canvas');
const { loadImage, createCanvas } = require('canvas');
const path = require('path');
module.exports = {
    name: 'youdied',
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
        const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'you-died.png'));
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member;
        const avatar = member.user.displayAvatarURL({ size: 2048, format: 'png' });
        const data = await loadImage(avatar);
        const canvas = createCanvas(data.width, data.height);
        const ctx = canvas.getContext('2d');
        drawImageWithTint(ctx, data, 'black', 0, 0, data.width, data.height);
        greyscale(ctx, 0, 0, data.width, data.height);
        const { x, y, width, height } = centerImage(base, data);
        ctx.drawImage(base, x, y, width, height);
        const attachment = new MessageAttachment(canvas.toBuffer(), 'you-died.png');
        message.channel.send(attachment);

    },
};