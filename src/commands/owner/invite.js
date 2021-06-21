// const { Client, Message, MessageEmbed } = require('discord.js');

// module.exports = {
//   name: 'invite',
//   aliases: [],
//   description: 'Invite the bot on the server',
//   category: 'owner',
//   utilisation: '{prefix}invite',
//   cooldown: 10,
//   nsfw: false,
//   ownerOnly: true,
//   adminOnly: false,
//   guildOnly: false,
//   permissions: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
//   clientPermissions: [
//     'VIEW_CHANNEL',
//     'SEND_MESSAGES',
//     'EMBED_LINKS',
//     'MANAGE_GUILD',
//   ],
//   string: [],
//   /**
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   async execute(client, message, args) {
//     if (message.guild) {
//       const invitesGuild = await message.guild
//         .fetchInvites()
//         .then((g) => {
//           if (!g.size) {
//             return { url: this.config.string[0] };
//           } else {
//             g.first();
//             return { url: g.first() };
//           }
//         })
//         .catch((e) => {
//           return {};
//         });
//       return message.channel.send({
//         embed: {
//           color: 'BLUE',
//           author: {
//             name: client.user.username,
//             icon_url: client.user.displayAvatarURL({
//               dynamic: true,
//               size: 512,
//               format: 'png',
//             }),
//           },
//           title: this.config.string[4],
//           fields: [
//             {
//               name: '\u200b',
//               value: [
//                 `[${this.config.string[1]}](https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=0&scope=bot)`,
//                 `${this.config.string[2]}`,
//               ].join('\n'),
//               inline: true,
//             },
//             {
//               name: '\u200b',
//               value: [
//                 `[${this.config.string[3]}](https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=1342696567&scope=bot)`,
//                 this.config.string[5],
//               ],
//               inline: true,
//             },
//             {
//               name: '\u200b',
//               value: [
//                 `[${this.config.string[6]}](https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=8&scope=bot)`,
//                 this.config.string[7],
//               ],
//               inline: true,
//             },
//             {
//               name: '\u200b',
//               value: [
//                 `[${this.config.string[8]}](https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=519249&scope=bot)`,
//                 this.config.string[9],
//               ],
//               inline: true,
//             },
//             {
//               name: '\u200b',
//               value: [
//                 `[${this.config.string[10]}](https://discord.com/oauth2/authorize?client_id=776825747897319424&permissions=1614138432&scope=bot)`,
//                 this.config.string[11],
//               ],
//               inline: true,
//             },
//             { name: '\u200b', value: '\u200b', inline: true },
//             {
//               name: `\u200b\n${this.config.string[12]}`,
//               value: invitesGuild.url || this.config.string[13],
//               inline: true,
//             },
//           ],
//           thumbnail:
//             'https://cdn.discordapp.com/avatars/823158943214862357/7b9c263a86aebaf3ee5842115ef569dd.png?size=2048',
//         },
//       });
//     } else {
//       return message.channel.send({
//         embed: {
//           color: 'BLUE',
//           author: {
//             name: client.user.username,
//             icon_url: client.user.displayAvatarURL({
//               dynamic: true,
//               size: 512,
//               format: 'png',
//             }),
//           },
//           title: this.config.string[4],
//           fields: [
//             {
//               name: '\u200b',
//               value: [
//                 `[${this.config.string[1]}](https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=0&scope=bot)`,
//                 `${this.config.string[2]}`,
//               ].join('\n'),
//               inline: true,
//             },
//             {
//               name: '\u200b',
//               value: [
//                 `[${this.config.string[3]}](https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=1342696567&scope=bot)`,
//                 this.config.string[5],
//               ],
//               inline: true,
//             },
//             {
//               name: '\u200b',
//               value: [
//                 `[${this.config.string[6]}](https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=8&scope=bot)`,
//                 this.config.string[7],
//               ],
//               inline: true,
//             },
//             {
//               name: '\u200b',
//               value: [
//                 `[${this.config.string[8]}](https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=519249&scope=bot)`,
//                 this.config.string[9],
//               ],
//               inline: true,
//             },
//             {
//               name: '\u200b',
//               value: [
//                 `[${this.config.string[10]}](https://discord.com/oauth2/authorize?client_id=776825747897319424&permissions=1614138432&scope=bot)`,
//                 this.config.string[11],
//               ],
//               inline: true,
//             },
//             { name: '\u200b', value: '\u200b', inline: true },
//             {
//               name: `\u200b\n${this.config.string[12]}`,
//               value: this.config.string[13],
//               inline: true,
//             },
//           ],
//           thumbnail:
//             message.author.displayAvatarURL({ dynamic: true }),
//         },
//       });
//     }
//   },
// };
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class InviteCommand extends Command {
   /** 
    *@param {Client} client 
    */ 
  constructor(client) {
    super(client, {
      name: 'invite',
      aliases: ['inv'],
      description: 'Invite of the bot',
      category: 'owner',
      cooldown: 5,
      utilisation: '{prefix}invite',
      ownerOnly: true,
      permissions: ['EMBED_LINKS', 'MANAGE_GUILD']
    });
  }
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {

  }
};