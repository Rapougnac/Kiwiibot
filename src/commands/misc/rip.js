const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const { loadImage, createCanvas } = require('canvas');
const { join } = require('path');
const Canvas = require('../../struct/Canvas');
module.exports = {
    name: 'rip',
    aliases: [],
    description: '',
    category: 'misc',
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
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase());
        if(User){
        try {
            const avatarURL = User.user.displayAvatarURL({ format: 'png', size: 512 });
            const cause = args.slice(1).join(' ');
            const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'rip.png'));
            const avatar = await loadImage(avatarURL);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 194, 399, 500, 500);
            Canvas.greyscale(ctx, 194, 399, 500, 500);
            ctx.textBaseline = 'top';
            ctx.textAlign = 'center';
            ctx.font = '45px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText(User.user.username, 438, 330, 500);
            ctx.fillText(cause, 438, 910, 500)
            ctx.fillText('In memory of', 438, 292);
            const att = new MessageAttachment(canvas.toBuffer(), 'rip.png');
            return message.channel.send(att);
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            const avatarURL = message.author.displayAvatarURL({ size: 512, format: 'png' });
            const cause = args.join(' ');
            //const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'rip2.png'));
            const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'rip.png'));
            console.log(base)
            const avatar = await loadImage(avatarURL);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 194, 399, 500, 500);
            Canvas.greyscale(ctx, 194, 399, 500, 500);
            ctx.textBaseline = 'top';
            ctx.textAlign = 'center';
            ctx.font = '45px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText('In memory of', 438, 292);
            ctx.fillText(message.author.username, 438, 330, 500);
            ctx.fillStyle = 'black';
            if(cause) ctx.fillText(cause, 438, 910, 500)
            const att = new MessageAttachment(canvas.toBuffer(), 'rip.png');
            return message.channel.send(att);
        } catch (error) {
            console.error(error);
        }
    }
    },
};