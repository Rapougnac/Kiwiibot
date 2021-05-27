const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../../struct/Client');
const Canvas = require('../../../struct/Canvas');
const { loadImage, createCanvas } = require('canvas');

module.exports = {
  name: 'fisheye',
  aliases: ['fh'],
  description: 'Fisheye your profile picture',
  category: 'Misc',
  utilisation: '{prefix}fisheye <member> [size]',
  cooldown: 5,
  nsfw: false,
  ownerOnly: false,
  adminOnly: false,
  guildOnly: false,
  permissions: [],
  clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
  string: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @returns {Promise<any>}
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
        return message.inlineReply(this.string[0], {
          allowedMentions: {
            repliedUser: false,
          },
        });
      if (isNaN(level)) {
        return message.inlineReply(this.string[1], {
          allowedMentions: {
            repliedUser: false,
          },
        });
      }
      ctx.drawImage(data, 0, 0);
      if (level > 10 && level < 1) {
        return message.inlineReply(this.string[2], {
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
        return message.inlineReply(this.string[0], {
          allowedMentions: {
            repliedUser: false,
          },
        });
      if (isNaN(level)) {
        return message.inlineReply(this.string[1], {
          allowedMentions: {
            repliedUser: false,
          },
        });
      }
      ctx.drawImage(data, 0, 0);
      if (level > 10 && level < 1) {
        return message.inlineReply(this.string[2], {
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