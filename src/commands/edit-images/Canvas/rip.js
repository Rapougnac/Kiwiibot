const { loadImage, createCanvas } = require('canvas');
const { join } = require('path');
const Canvas = require('../../../struct/Canvas');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../../struct/Command');
const Client = require('../../../struct/Client');
module.exports = class RipCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'rip',
      aliases: [],
      description: 'Rip',
      category: 'edit-images',
      cooldown: 5,
      utilisation: '{prefix}rip <member>',
      clientPermissions: ['ATTACH_FILES'],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const User =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find((r) =>
        r.user.username.toLowerCase().startsWith(args.join(' ').toLowerCase())
      ) ||
      message.guild.members.cache.find((r) =>
        r.displayName.toLowerCase().startsWith(args.join(' ').toLowerCase())
      );
    if (User !== undefined) {
      try {
        client.utils.loader.start({
          length: 4,
          time: 1000,
          allowMessage: true,
          message,
          deleteMessage: true,
        });
        message.channel.startTyping();
        const avatarURL = User.user.displayAvatarURL({
          format: 'png',
          size: 512,
        });
        const cause = args.slice(1).join(' ');
        const base = await loadImage(
          join(__dirname, '..', '..', '..', 'assets', 'images', 'rip.png')
        );
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
        ctx.fillText(cause, 438, 910, 500);
        ctx.fillText('In memory of', 438, 292);
        const att = new MessageAttachment(canvas.toBuffer(), 'rip.png');
        message.channel.stopTyping();
        return message.channel.send(att);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        client.utils.loader.start({
          length: 4,
          time: 1000,
          allowMessage: true,
          message,
          deleteMessage: true,
        });
        message.channel.startTyping();
        const avatarURL = message.author.displayAvatarURL({
          size: 512,
          format: 'png',
        });
        const cause = args.join(' ');
        const base = await loadImage(
          join(__dirname, '..', '..', '..', 'assets', 'images', 'rip.png')
        );
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
        if (cause) ctx.fillText(cause, 438, 910, 500);
        const att = new MessageAttachment(canvas.toBuffer(), 'rip.png');
        message.channel.stopTyping();
        return message.channel.send(att);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
