const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const Canvas = require('../../struct/Canvas');
const { loadImage, createCanvas } = require('canvas')
module.exports = {
    name: 'uuu',
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
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member;
        const image = User.user.displayAvatarURL({ format: 'png', size: 4096 });
        const data = await loadImage(image);
        const canvas = createCanvas(data.width, data.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(data, 0, 0);

        Canvas.greyscale(ctx, 0, 0, data.width, data.height);

        const attachement = new MessageAttachment(canvas.toBuffer(), 'test.png');
        return message.channel.send(attachement)
    },
};