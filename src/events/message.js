// const {
//     Collection,
//     MessageEmbed,
//     Message,
//     MessageAttachment,
//   } = require('discord.js'),
//   Client = require('../struct/Client'),
//   Command = require('../struct/Command');
// /**
//  * @param {Message} message
//  * @param {Client} client
//  */
// module.exports = async (client, message) => {
//   const { author, guild } = message;
//   const { bot } = author;
//   let prefix = [
//     client.prefix,
//     message.guild ? message.guild.prefix : null,
//     `<@!${client.user.id}>`,
//   ];
//   if (
//     (bot && author.id !== client.config.discord.id_bot_test) ||
//     message.webhookID
//   )
//     return;
//   if (!guild) return;
//   if (message.content.match(/n+o+ +u+/gi)) return message.channel.send('no u');
//   if (message.content.match(/\(╯°□°）╯︵ ┻━┻/g))
//     return message.channel.send('┻━┻       (゜-゜)');
//   // Check prefix
//   let index;
//   // Find which prefix are used
//   for (let i = 0; i < prefix.length; i++) {
//     if (message.content.toLowerCase().startsWith(prefix[i])) {
//       index = i;
//       break;
//     }
//   }
//   if (
//     message.content.startsWith(`<@!${client.user.id}>`) &&
//     message.content.endsWith(`<@!${client.user.id}>`) &&
//     guild
//   )
//     return message.inlineReply(
//       message.guild.i18n.__mf('MESSAGE_PREFIX.msg', {
//         prefix: message.guild.prefix,
//       })
//     );
//   if (!message.content.toLowerCase().startsWith(prefix[index])) return;
//   const args = message.content.slice(prefix[index].length).trim().split(/\s+/g);
//   const command = args.shift().toLowerCase();
//   if (!client.commands.has(command) && !client.aliases.has(command)) return;
//   /**
//    * @type {Command}
//    */
//   const command_to_execute =
//     client.commands.get(command) || client.aliases.get(command);
//   command_to_execute.setMessage(message);
//   if (command_to_execute) {
//     if (client.owners.includes(message.author.id)) {
//       try {
//         command_to_execute.execute(client, message, args);
//       } catch (error) {
//         console.error(error);
//         message.reply(message.guild.i18n.__mf('ERROR_MESSAGE') + error.name);
//       }
//     } else {
//       const reasons = [];
//       if (message.channel.type === 'dm') {
//         if (command_to_execute.config.guildOnly) {
//           reasons.push(message.guild.i18n.__mf('PERMS_MESSAGE.guild_only'));
//         }
//       }

//       if (command_to_execute.config.ownerOnly) {
//         if (!client.owners.includes(message.author.id)) {
//           reasons.push(message.guild.i18n.__mf('PERMS_MESSAGE.dev_only'));
//         }
//       }
//       if (command_to_execute.config.adminOnly) {
//         if (!message.member.hasPermission('ADMINISTRATOR')) {
//           reasons.push(message.guild.i18n.__mf('PERMS_MESSAGE.admin_only'));
//         }
//       }
//       if (command_to_execute.config.nsfw) {
//         if (!message.channel.nsfw) {
//           reasons.push(message.guild.i18n.__mf('PERMS_MESSAGE.nsfw'));
//         }
//       }
//       if (Array.isArray(command_to_execute.config.permissions)) {
//         if (
//           !message.channel
//             .permissionsFor(message.member)
//             .has(command_to_execute.config.permissions)
//         ) {
//           reasons.push(
//             [
//               message.guild.i18n.__mf('PERMS_MESSAGE.missing_permissions_you'),
//               message.guild.i18n.__mf('PERMS_MESSAGE.missing_permissions1_you'),
//               Object.entries(
//                 message.channel.permissionsFor(message.member).serialize()
//               )
//                 .filter(
//                   (p) =>
//                     command_to_execute.config.permissions.includes(p[0]) &&
//                     !p[1]
//                 )
//                 .flatMap((c) =>
//                   c[0]
//                     .toLowerCase()
//                     .replace(/(^|"|_)(\S)/g, (x) => x.toUpperCase())
//                     .replace(/_/g, ' ')
//                     .replace(/Guild/g, 'Server')
//                     .replace(/Use Vad/g, 'Use Voice Activity')
//                 )
//                 .join('\n\u2000\u2000- '),
//             ].join('')
//           );
//         }
//       }
//       if (Array.isArray(command_to_execute.config.clientPermissions)) {
//         if (
//           !message.channel
//             .permissionsFor(message.guild.me)
//             .has(command_to_execute.config.clientPermissions)
//         ) {
//           reasons.push(
//             [
//               message.guild.i18n.__mf('PERMS_MESSAGE.missing_permissions_i'),
//               message.guild.i18n.__mf('PERMS_MESSAGE.missing_permissions1_i'),
//               Object.entries(
//                 message.channel.permissionsFor(message.guild.me).serialize()
//               )
//                 .filter(
//                   (p) =>
//                     command_to_execute.config.clientPermissions.includes(
//                       p[0]
//                     ) && !p[1]
//                 )
//                 .flatMap((c) =>
//                   c[0]
//                     .toLowerCase()
//                     .replace(/(^|"|_)(\S)/g, (x) => x.toUpperCase())
//                     .replace(/_/g, ' ')
//                     .replace(/Guild/g, 'Server')
//                     .replace(/Use VAD/g, 'Use Voice Activity')
//                 )
//                 .join('\n\u2000\u2000- '),
//             ].join('')
//           );
//         }
//       }

//       if (reasons.length > 0) {
//         const embed = new MessageEmbed()
//           .setAuthor(
//             client.user.tag,
//             client.user.displayAvatarURL({
//               dynamic: true,
//               format: 'png',
//               size: 2048,
//             })
//           )
//           .setColor('RED')
//           .setDescription(
//             `\`\`\`diff\n-${message.guild.i18n.__mf(
//               'PERMS_MESSAGE.blocked_cmd'
//             )}\n\`\`\`\n\n` +
//               `\`${message.guild.i18n.__mf(
//                 'PERMS_MESSAGE.reason'
//               )}:\`\n\n${reasons.map((reason) => '• ' + reason).join('\n')}`
//           );
//         return message.channel.send(embed);
//       } else {
//         try {
//           command_to_execute.execute(client, message, args);
//         } catch (error) {
//           console.error(error);
//           message.reply(message.guild.i18n.__mf('ERROR_MESSAGE') + error.name);
//         }
//       }
//     }
//   } else {
//     return;
//   }
// };
const { Client, Event, MessageEmbed } = require('../struct/main');
const Command = require('../struct/Command');
const { Message } = require('discord.js');
module.exports = class MessageEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'message',
    });
  }
  /**
   *
   * @param {Message} message
   * @returns {any}
   */
  execute(message) {
    const { author, guild } = message;
    const { bot } = author;
    let prefix = [
      this.client.prefix,
      message.guild ? message.guild.prefix : null,
      `<@!${this.client.user.id}>`,
    ];
    if (
      (bot && author.id !== this.client.config.discord.id_bot_test) ||
      message.webhookID
    )
      return;
    if (!guild) return;
    if (message.content.match(/n+o+ +u+/gi))
      return message.channel.send('no u');
    if (message.content.match(/\(╯°□°）╯︵ ┻━┻/g))
      return message.channel.send('┻━┻       (゜-゜)');
    // Check prefix
    let index;
    // Find which prefix are used
    for (let i = 0; i < prefix.length; i++) {
      if (message.content.toLowerCase().startsWith(prefix[i])) {
        index = i;
        break;
      }
    }
    if (
      message.content.startsWith(`<@!${this.client.user.id}>`) &&
      message.content.endsWith(`<@!${this.client.user.id}>`) &&
      guild
    )
      return message.inlineReply(
        message.guild.i18n.__mf('MESSAGE_PREFIX.msg', {
          prefix: message.guild.prefix,
        })
      );

    const args = message.content
      .slice(prefix[index]?.length ? prefix[index].length : 0)
      .trim()
      .split(/\s+/g);
    const command = args.shift().toLowerCase();
    if (!this.client.commands.has(command) && !this.client.aliases.has(command))
      return;
    /**
     * @type {Command}
     */
    const command_to_execute =
      this.client.commands.get(command) || this.client.aliases.get(command);
    command_to_execute.setMessage(message);
    const reasons = this.client.utils.checkPermissions(
      message,
      command_to_execute
    );
    if (this.client.isOwner(author)) {
      if (command_to_execute.patterns) {
        for (const pattern of command_to_execute.patterns) {
          if (message.content.match(pattern)) {
            try {
              command_to_execute.execute(this.client, message, args);
            } catch (error) {
              console.error(error);
              message.reply(
                message.guild.i18n.__mf('ERROR_MESSAGE') + error.name
              );
            }
          }
        }
      }
      try {
        command_to_execute.execute(this.client, message, args);
      } catch (error) {
        console.error(error);
        message.reply(message.guild.i18n.__mf('ERROR_MESSAGE') + error.name);
      }
    } else {
      if (command_to_execute.patterns) {
        for (const pattern of command_to_execute.patterns) {
          if (message.content.match(pattern)) {
            try {
              command_to_execute.execute(this.client, message, args);
            } catch (error) {
              console.error(error);
              message.reply(
                message.guild.i18n.__mf('ERROR_MESSAGE') + error.name
              );
            }
          }
        }
      }
      if (!message.content.toLowerCase().startsWith(prefix[index])) return;

      if (reasons.length > 0) {
        const embed = new MessageEmbed()
          .setAuthor(
            message.client.user.tag,
            message.client.user.displayAvatarURL({
              dynamic: true,
              format: 'png',
              size: 2048,
            })
          )
          .setColor('RED')
          .setDescription(
            `\`\`\`diff\n-${message.guild.i18n.__mf(
              'PERMS_MESSAGE.blocked_cmd'
            )}\n\`\`\`\n\n` +
              `\`${message.guild.i18n.__mf(
                'PERMS_MESSAGE.reason'
              )}:\`\n\n${reasons.map((reason) => '• ' + reason).join('\n')}`
          );
        return message.channel.send(embed);
      } else {
        try {
          command_to_execute.execute(this.client, message, args);
        } catch (error) {
          console.error(error);
          message.reply(message.guild.i18n.__mf('ERROR_MESSAGE') + error.name);
        }
      }
    }
  }
};
