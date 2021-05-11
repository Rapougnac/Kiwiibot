const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const Canvas = require('../../struct/Canvas');
const { loadImage, createCanvas } = require('canvas');

module.exports = {
  name: 'fisheye',
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
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) => r.user.username.toLowerCase() == args.join(' ').toLowerCase()
      ) ||
      message.guild.members.cache.find(
        (r) => r.displayName.toLowerCase() === args.join(' ').toLowerCase()
      );
    if (member) {
      const avatar = member.user.displayAvatarURL({
        size: 1024,
        format: 'png',
      });
      const data = await loadImage(avatar);
      const canvas = createCanvas(data.width, data.height);
      const ctx = canvas.getContext('2d');
      let level = args[0].slice(1);
      if (!level)
        return message.inlineReply('Please insert a number between 1 to 10', {
          allowedMentions: {
            repliedUser: false,
          },
        });
      if (isNaN(level)) {
        return message.inlineReply('Please insert a valid number', {
          allowedMentions: {
            repliedUser: false,
          },
        });
      }
      ctx.drawImage(data, 0, 0);
      if (level > 10) {
        return message.inlineReply('Distortion must be between 1 to 10!', {
          allowedMentions: {
            repliedUser: false,
          },
        });
      }
      if (level < 1) {
        return message.inlineReply('Distortion must be between 1 to 10!', {
          allowedMentions: {
            repliedUser: false,
          },
        });
      }
      Canvas.fishEye(ctx, level, 0, 0, data.width, data.height);

      const att = new MessageAttachment(canvas.toBuffer(), 'fisheye.png');

      message.channel.send(att);
    } else {
      const avatar = message.author.displayAvatarURL({
        size: 1024,
        format: 'png',
      });
      const data = await loadImage(avatar);
      const canvas = createCanvas(data.width, data.height);
      const ctx = canvas.getContext('2d');
      let level = args[0];
      if (!level)
        return message.inlineReply('Please insert a number between 1 to 10', {
          allowedMentions: {
            repliedUser: false,
          },
        });
      if (isNaN(level)) {
        return message.inlineReply('Please insert a valid number', {
          allowedMentions: {
            repliedUser: false,
          },
        });
      }
      ctx.drawImage(data, 0, 0);
      if (level > 10) {
        return message.inlineReply('Distortion must be between 1 to 10!', {
          allowedMentions: {
            repliedUser: false,
          },
        });
      }
      if (level < 1) {
        return message.inlineReply('Distortion must be between 1 to 10!', {
          allowedMentions: {
            repliedUser: false,
          },
        });
      }
      Canvas.fishEye(ctx, level, 0, 0, data.width, data.height);

      const att = new MessageAttachment(canvas.toBuffer(), 'fisheye.png');

      message.channel.send(att);
    }
  },
};
