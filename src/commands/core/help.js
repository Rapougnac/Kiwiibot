// const { MessageEmbed, Message } = require('discord.js');

// module.exports = {
//   name: 'help',
//   aliases: ['h'],
//   category: 'core',
//   description: 'Shows the help pannel or the function of a command',
//   utilisation: '{prefix}help <command name>',
//   cooldown: 10,
//   guildOnly: true,
//   adminOnly: false,
//   ownerOnly: false,
//   nsfw: false,
//   permissions: [],
//   clientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL'],
//   string: [],
//   /**
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   async execute(client, message, args) {
//     if (args.length > 2) return;
//     if (!args[0]) {
//       const embed = new MessageEmbed()
//         .setDescription(
//           message.channel.nsfw
//             ? `${[...client.categories]
//                 .map(
//                   (val) =>
//                     `**${_.upperFirst(val)}** [${
//                       client.commands.filter((c) => c.category === val).size
//                     }]\n${joinArray(
//                       client.commands
//                         .filter((c) => c.category === val)
//                         .map((value) => `\`${value.name}\``)
//                     )}`
//                 )
//                 .join('\n\n')}`
//             : `${[...client.categories].remove('nsfw')
//                 .map(
//                   (val) =>
//                     `**${_.upperFirst(val)}** [${
//                       client.commands.filter((c) => c.category === val).size
//                     }]\n${joinArray(
//                       client.commands
//                         .filter((c) => c.category === val)
//                         .map((value) => `\`${value.name}\``)
//                     )}`
//                 )
//                 .join('\n\n')}`
//         )
//         .setColor('ORANGE')
//         .setTimestamp()
//         .setFooter(this.config.string[18].format(client.prefix))

//       message.channel.send(embed);
//     } else {
//       const command =
//         message.client.commands.get(args.join(' ').toLowerCase()) ||
//         message.client.commands.find(
//           (x) => x.aliases && x.aliases.includes(args.join(' ').toLowerCase())
//         );

//       if (!command)
//         return message.channel.send(
//           `\\${client.emotes.error} - ${this.config.string[0]}`
//         );

//       await message.channel.send({
//         embed: {
//           color: 'ORANGE',
//           author: { name: this.config.string[1] },
//           fields: [
//             { name: this.config.string[2], value: command.name, inline: true },
//             { name: this.config.string[3], value: _.upperFirst(command.category), inline: true },
//             {
//               name: this.config.string[4],
//               value:
//                 command.aliases.length < 1
//                   ? this.config.string[5]
//                   : command.aliases.join('\n'),
//               inline: true,
//             },
//             {
//               name: this.config.string[8],
//               value: command.utilisation.replace('{prefix}', client.prefix),
//               inline: true,
//             },
//             { name: 'Description', value: command.description, inline: true },
//             {
//               name: 'Cooldown',
//               value: command.cooldown ? `${command.cooldown} ${this.config.string[7]}` : this.config.string[6],
//               inline: true,
//             },
//             {
//               name: this.config.string[9],
//               value: command.guildOnly ? this.config.string[15] : this.config.string[16],
//               inline: true,
//             },
//             {
//               name: this.config.string[10],
//               value: command.adminOnly ? this.config.string[15] : this.config.string[16],
//               inline: true,
//             },
//             {
//               name: this.config.string[11],
//               value: command.ownerOnly ? this.config.string[15] : this.config.string[16],
//               inline: true,
//             },
//             {
//               name: this.config.string[12],
//               value:
//                 command.permissions.length === 0
//                   ? this.config.string[17]
//                   : command.permissions.map((x) =>
//                       x
//                         .toLowerCase()
//                         .replace(/(^|"|_)(\S)/g, (z) => z.toUpperCase())
//                         .replace(/_/g, ' ')
//                         .replace(/Use Vad/g, 'Use Voice Activity')
//                         .replace(/Guild/g, 'Server')
//                     ),
//               inline: true,
//             },
//             {
//               name: this.config.string[13],
//               value:
//                 command.clientPermissions.length === 0
//                   ? this.config.string[17]
//                   : command.clientPermissions.map((x) =>
//                       x
//                         .toLowerCase()
//                         .replace(/(^|"|_)(\S)/g, (z) => z.toUpperCase())
//                         .replace(/_/g, ' ')
//                         .replace(/Use Vad/g, 'Use Voice Activity')
//                         .replace(/Guild/g, 'Server')
//                     ),
//               inline: true,
//             },
//           ],
//           timestamp: new Date(),
//           description:
//             this.config.string[14],
//         },
//       });
//     }
//   },
// };
const _ = require('lodash');
const { joinArray } = require('../../util/string');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class HelpCommand extends Command {
  /**
   *
   * @param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'help',
      aliases: ['h'],
      description: 'Get the help command',
      category: 'core',
      cooldown: 5,
      utilisation: '{prefix}help <commandname>',
      string: [],
      permissions: [],
      clientPermissions: ['EMBED_LINKS'],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (args.length > 2) return;
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setDescription(
          message.channel.nsfw
            ? `${[...client.categories]
                .map(
                  (val) =>
                    `**${_.upperFirst(val.replace(/-/g, ' '))}** [${
                      client.commands.filter((c) => c.help.category === val)
                        .size
                    }]\n${joinArray([
                      ...client.commands
                        .filter((c) => c.help.category === val)
                        .map((value) => `\`${value.help.name}\``),
                    ])}`
                )
                .join('\n\n')}`
            : `${[...client.categories]
                .remove('nsfw')
                .map(
                  (val) =>
                    `**${_.upperFirst(val.replace(/-/g, ' '))}** [${
                      client.commands.filter((c) => c.help.category === val)
                        .size
                    }]\n${joinArray([
                      ...client.commands
                        .filter((c) => c.help.category === val)
                        .map((value) => `\`${value.help.name}\``),
                    ])}`
                )
                .join('\n\n')}`
        )
        .setColor('ORANGE')
        .setTimestamp()
        .setFooter(this.config.string[18].format(client.prefix));

      message.channel.send(embed);
    } else {
      /**
       * @type {Command}
       */
      const command =
        message.client.commands.get(args.join(' ').toLowerCase()) ||
        message.client.commands.find(
          (x) => x.aliases && x.aliases.includes(args.join(' ').toLowerCase())
        );

      if (!command)
        return message.channel.send(
          `\\${client.emotes.error} - ${this.config.string[0]}`
        );

      await message.channel.send({
        embed: {
          color: 'ORANGE',
          author: { name: this.config.string[1] },
          fields: [
            { name: this.config.string[2], value: command.help.name, inline: true },
            {
              name: this.config.string[3],
              value: _.upperFirst(command.help.category),
              inline: true,
            },
            {
              name: this.config.string[4],
              value:
                command.config.aliases.length < 1
                  ? this.config.string[5]
                  : command.config.aliases.join('\n'),
              inline: true,
            },
            {
              name: this.config.string[8],
              value: command.help.utilisation.replace('{prefix}', client.prefix),
              inline: true,
            },
            {
              name: 'Cooldown',
              value: command.config.cooldown
                ? `${command.config.cooldown} ${this.config.string[7]}`
                : this.config.string[6],
              inline: true,
            },
            {
              name: this.config.string[9],
              value: command.config.guildOnly
                ? this.config.string[15]
                : this.config.string[16],
              inline: true,
            },
            {
              name: this.config.string[10],
              value: command.config.adminOnly
                ? this.config.string[15]
                : this.config.string[16],
              inline: true,
            },
            {
              name: this.config.string[11],
              value: command.config.ownerOnly
                ? this.config.string[15]
                : this.config.string[16],
              inline: true,
            },
            {
              name: this.config.string[12],
              value:
                command.config.permissions.length === 0
                  ? this.config.string[17]
                  : command.config.permissions.map((x) =>
                      x
                        .toLowerCase()
                        .replace(/(^|"|_)(\S)/g, (z) => z.toUpperCase())
                        .replace(/_/g, ' ')
                        .replace(/Use Vad/g, 'Use Voice Activity')
                        .replace(/Guild/g, 'Server')
                    ),
              inline: true,
            },
            {
              name: this.config.string[13],
              value:
                command.config.clientPermissions.length === 0
                  ? this.config.string[17]
                  : command.config.clientPermissions.map((x) =>
                      x
                        .toLowerCase()
                        .replace(/(^|"|_)(\S)/g, (z) => z.toUpperCase())
                        .replace(/_/g, ' ')
                        .replace(/Use Vad/g, 'Use Voice Activity')
                        .replace(/Guild/g, 'Server')
                    ),
              inline: true,
            },
            { name: 'Description', value: command.help.description, inline: false },
          ],
          timestamp: new Date(),
          description: this.config.string[14],
        },
      });
    }
  }
};
