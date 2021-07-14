// const { MessageAttachment, Message } = require('discord.js'),

//   Client = require('../../../struct/Client');

// module.exports = {
//   name: '3000y',
//   aliases: [],
//   description: 'Sends your avatar with the 3000y meme',
//   category: 'misc',
//   utilisation: '{prefix}3000y <member>',
//   cooldown: 5,
//   guildOnly: false,
//   ownerOnly: false,
//   adminOnly: false,
//   nsfw: false,
//   permissions: [],
//   clientPermissions: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES'],
//   string: [],
//   /**
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   async execute(client, message, args) {
//     const AmeAPI = new AmeClient(client.config.amethyste.client);
//     {
//       message.channel.startTyping();
//       const User =
//         message.mentions.members.first() ||
//         message.guild.members.cache.get(args[0]) ||
//         message.guild.members.cache.find(
//           (r) => r.user.username.toLowerCase().startsWith(args.join(' ').toLowerCase())
//         ) ||
//         message.guild.members.cache.find((r) =>
//           r.displayName.toLowerCase().startsWith(args.join(' ').toLowerCase())
//         ) ||
//         message.member;
//       let m = await message.channel.send(message.guild.i18n.__mf("common.wait"));
//       const buffer = await AmeAPI.generate('3000years', {
//         url: User.user.displayAvatarURL({ format: 'png', size: 2048 }),
//       });
//       const attachment = new MessageAttachment(buffer, '3000years.png');
//       m.delete({ timeout: 3000 });
//       message.channel.send(attachment);
//       message.channel.stopTyping();
//     }
//   },
// };
const AmeClient = require('amethyste-api');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../../struct/Command');
const Client = require('../../../struct/Client');
module.exports = class ThreeTousandYearsCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: '3000y',
      aliases: [],
      description: 'Sends you, or the specified member with the 3000y meme',
      category: 'image-manipulation',
      cooldown: 5,
      utilisation: '{prefix}3000y <member>',
      string: [],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const AmeAPI = new AmeClient(client.config.amethyste.client);
    if(message.guild){
      message.channel.startTyping();
      let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username
            .toLowerCase()
            .startsWith(args.join(' ').toLowerCase()) ||
          r.user.username.toLowerCase().endsWith(args.join(' ').toLowerCase())
      ) ||
      message.guild.members.cache.find(
        (r) =>
          r.displayName
            .toLowerCase()
            .startsWith(args.join(' ').toLowerCase()) ||
          r.displayName.toLowerCase().endsWith(args.join(' ').toLowerCase())
      );
      if (args.length <= 0) member = message.member;
      let m = await message.channel.send(message.guild.i18n.__mf("common.wait"));
      const buffer = await AmeAPI.generate('3000years', {
        url: member.user.displayAvatarURL({ format: 'png', size: 2048 }),
      });
      const attachment = new MessageAttachment(buffer, '3000years.png');
      m.delete({ timeout: 3000 });
      message.channel.send(attachment);
      message.channel.stopTyping();
    } else {
      let member = message.author;
      let m = await message.channel.send(message.guild.i18n.__mf("common.wait"));
      const buffer = await AmeAPI.generate('3000years', {
        url: member.displayAvatarURL({ format: 'png', size: 2048 }),
      });
      const attachment = new MessageAttachment(buffer, '3000years.png');
      m.delete({ timeout: 3000 });
      message.channel.send(attachment);
      message.channel.stopTyping();
    }
  }
};
