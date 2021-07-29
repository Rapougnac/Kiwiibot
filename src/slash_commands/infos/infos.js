// const { convertUFB, joinArray } = require('../../util/string');
// const languageSchema = require('../../models/languageSchema');
// // eslint-disable-next-line no-unused-vars
// const { MessageEmbed, Message, User, Role } = require('discord.js');
// const moment = require('moment');
// /**@type {import('../../../types/index').SlashCommand} */
// module.exports = {
//   name: 'info',
//   description: 'Get infos about the server, a user, or a role.',
//   global: false,
//   commandOptions: [
//     {
//       name: 'user',
//       description: 'Get infos about you, or the specified user.',
//       type: 1,
//       options: [
//         {
//           name: 'user',
//           description: 'The user to display',
//           type: 6,
//           required: false,
//         },
//       ],
//     },
//     {
//       name: 'server',
//       description: 'Get informations about the server.',
//       type: 1,
//     },
//     {
//       name: 'role',
//       description: 'Get informations to the specified role.',
//       type: 1,
//       options: [
//         {
//           name: 'role',
//           description: 'Role to display',
//           type: 8,
//           required: true,
//         },
//       ],
//     },
//   ],
//   /**
//    *
//    * @param {import('../../struct/Interactions/CommandInteraction')} interaction
//    * @param {import('../../struct/Client')} client
//    * @param {{user: User, role: Role }} args
//    */
//   async execute(interaction, client, { user, role }) {
//     switch (interaction.options.getSubCommand()) {
//       case 'user': {
//         if (interaction.guild) {
//           if (!user) user = interaction.member.user;
//           const member = interaction.guild.member(user);
//           let status = member.user.presence.status;
//           const userFlags = await user
//             .fetchFlags()
//             .then((flags) => convertUFB(flags))
//             .then((flags) =>
//               flags.map(
//                 (key) =>
//                   client.emojis.cache.find((x) => x.name === key)?.toString() ||
//                   key
//               )
//             )
//             .catch(console.error);
//           const Device = user.presence.clientStatus;
//           let device = Object.getOwnPropertyNames(Device || {});
//           switch (Device) {
//             case null: {
//               device[0] = 'N/A';
//               break;
//             }
//             case undefined: {
//               device[0] = 'N/A';
//               break;
//             }
//             case !Device: {
//               device[0] = 'N/A';
//               break;
//             }
//           }
//           if (interaction.guild.ownerID === user.id) {
//             userFlags.push('<:GUILD_OWNER:812992729797230592>');
//           }
//           if (member.hasPermission('ADMINISTRATOR')) {
//             userFlags.push('<:ADMINISTRATOR:827241621270560788>');
//           }
//           if (member.premiumSinceTimestamp > 0) {
//             userFlags.push('<:ServerBooster:850729871477833759>');
//           }
//           if (
//             (user.avatar && user.avatar.startsWith('a_')) ||
//             member.premiumSince ||
//             client.isOwner(member)
//           ) {
//             userFlags.push('<:Discord_Nitro:859137224187707402>');
//           }
//           if (client.isOwner(user)) {
//             userFlags.push('<:Bot_Owner:864234649960972298>');
//           }
//           switch (status) {
//             case 'dnd': {
//               status = interaction.guild.i18n.__mf('userinfo.dnd');
//               break;
//             }
//             case 'online': {
//               status = interaction.guild.i18n.__mf('userinfo.online');
//               break;
//             }
//             case 'offline': {
//               status = interaction.guild.i18n.__mf('userinfo.offline');
//               break;
//             }
//             case 'idle': {
//               status = interaction.guild.i18n.__mf('userinfo.idle');
//               break;
//             }
//           }
//           switch (device[0]) {
//             case 'web': {
//               device[0] = 'Web ' + client.config.clientMap.web;
//               break;
//             }
//             case 'desktop': {
//               device[0] = interaction.guild.i18n.__mf('userinfo.desktop', {
//                 x: client.config.clientMap.desktop,
//               });
//               break;
//             }
//             case 'mobile': {
//               device[0] = 'Mobile ' + client.config.clientMap.mobile;
//               break;
//             }
//           }
//           let lang;
//           try {
//             await languageSchema.findOne(
//               {
//                 _id: interaction.guild.id,
//               },
//               (err, data) => {
//                 if (err) throw err;
//                 if (!data)
//                   data = new languageSchema({
//                     _id: interaction.guild.id,
//                     language: 'en',
//                   });
//                 lang = data.language;
//               }
//             );
//             if (!lang) lang = 'en';
//           } catch (e) {
//             console.error(e);
//           }
//           const embeduser = new MessageEmbed()
//             .setAuthor(
//               interaction.guild.i18n.__mf('userinfo.user', { tag: user.tag }),
//               member.user.displayAvatarURL({
//                 dynamic: true,
//                 format: 'png',
//                 size: 512,
//               }),
//               'https://discord.com/'
//             )
//             .setDescription(userFlags.join(' '))
//             .addField(
//               interaction.guild.i18n.__mf('userinfo.member'),
//               member,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('userinfo.name'),
//               user.tag,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('userinfo.nickname'),
//               member.nickname
//                 ? `${member.nickname}`
//                 : interaction.guild.i18n.__mf('userinfo.not_set'),
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('userinfo.account_creation_date'),
//               moment(user.createdAt).format(
//                 `[${interaction.guild.i18n.__mf(
//                   'common.on'
//                 )}] DD/MM/YYYY [${interaction.guild.i18n.__mf(
//                   'common.at'
//                 )}] HH:mm:ss`
//               ) +
//                 `\n\`${moment(user.createdAt, 'DD/MM/YYYY')
//                   .locale(lang)
//                   .fromNow()}\``,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('userinfo.arrival_date'),
//               moment(member.joinedAt).format(
//                 `[${interaction.guild.i18n.__mf(
//                   'common.on'
//                 )}] DD/MM/YYYY [${interaction.guild.i18n.__mf(
//                   'common.at'
//                 )}] HH:mm:ss`
//               ) +
//                 `\n\`${moment(member.joinedAt, 'DD/MM/YYYY')
//                   .locale(lang)
//                   .fromNow()}\``,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('userinfo.boost_start_date'),
//               member.premiumSince
//                 ? moment(member.premiumSince).format(
//                     `[${interaction.guild.i18n.__mf(
//                       'common.on'
//                     )}] DD/MM/YYYY [${interaction.guild.i18n.__mf(
//                       'common.at'
//                     )}] HH:mm:ss`
//                   ) +
//                     `\n\`${moment(member.premiumSince, 'DD/MM/YYYY')
//                       .locale(lang)
//                       .fromNow()}\``
//                 : interaction.guild.i18n.__mf('userinfo.not_boosting'),
//               true
//             )
//             .addField('Presence', status, true)
//             .addField(
//               interaction.guild.i18n.__mf('userinfo.device'),
//               device[0],
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('userinfo.type'),
//               user.bot ? 'Bot' : interaction.guild.i18n.__mf('userinfo.user2'),
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('userinfo.roles', {
//                 role: member.roles.cache.size - 1,
//               }),
//               member.roles.cache.size - 1 <= 0
//                 ? interaction.guild.i18n.__mf('userinfo.no_roles')
//                 : member.roles.cache
//                     .filter((r) => r.id !== interaction.guild.id)
//                     .sort((A, B) => B.rawPosition - A.rawPosition)
//                     .map((x) => `${x}`)
//                     .splice(0, 50)
//                     .join(' | ') || '\u200b'
//             )
//             .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 }))
//             .setFooter(`ID : ${user.id}`)
//             .setColor(member.displayHexColor || 'GREY');
//           const data = await client.fetchUserViaAPI(user);
//           if (data.data.banner) {
//             embeduser.setImage(
//               await user.displayUserBannerURL({
//                 format: 'png',
//                 size: 4096,
//                 dynamic: true,
//               })
//             );
//           }
//           interaction.send(embeduser);
//         } else {
//           interaction.send('This command can only be used inside guilds!');
//         }
//         break;
//       }
//       case 'server': {
//         if (interaction.guild) {
//           const { afkTimeout } = interaction.guild;
//           const botcount = interaction.guild.members.cache.filter(
//             (member) => member.user.bot
//           ).size;
//           const humancount = interaction.guild.members.cache.filter(
//             (member) => !member.user.bot
//           ).size;
//           const embedserv = new MessageEmbed()
//             .setAuthor(
//               interaction.guild.name,
//               interaction.guild.iconURL({ dynamic: true })
//             )
//             .addField(
//               interaction.guild.i18n.__mf('serverinfo.owner'),
//               `<@!${interaction.guild.ownerID}>\n(\`${interaction.guild.owner.user.tag}\`)`,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('serverinfor.name'),
//               interaction.guild.name,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('serverinfor.region'),
//               interaction.guild.region,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('serverinfor.members'),
//               `${interaction.guild.memberCount} ${interaction.guild.i18n.__mf(
//                 'serverinfo.members2'
//               )}\n${humancount} ${interaction.guild.i18n.__mf(
//                 'serverinfo.humans'
//               )}\n${botcount} ${interaction.guild.i18n.__mf(
//                 'serverinfo.bots'
//               )}`,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('serverinfo.online_members'),
//               interaction.guild.members.cache.filter(
//                 ({ presence }) => presence.status !== 'offline'
//               ).size,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('serverinfo.channels'),
//               `${
//                 interaction.guild.channels.cache.size
//               } ${interaction.guild.i18n.__mf('serverinfo.channels2')}\n${
//                 interaction.guild.channels.cache.filter(
//                   (channel) => channel.type === 'text'
//                 ).size
//               } ${interaction.guild.i18n.__mf('serverinfo.text_channels')}\n${
//                 interaction.guild.channels.cache.filter(
//                   (channel) => channel.type === 'voice'
//                 ).size
//               } ${interaction.guild.i18n.__mf('serverinfo.voice_channels')}\n${
//                 interaction.guild.channels.cache.filter(
//                   (channel) => channel.type === 'category'
//                 ).size
//               } ${interaction.guild.i18n.__mf('serverinfo.category')}`,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('serverinfo.emotes'),
//               `${interaction.guild.emojis.cache.size} emojis\n${
//                 interaction.guild.emojis.cache.filter(
//                   (emoji) => !emoji.animated
//                 ).size
//               } ${interaction.guild.i18n.__mf('serverinfo.static_emotes')}\n${
//                 interaction.guild.emojis.cache.filter((emoji) => emoji.animated)
//                   .size
//               } ${interaction.guild.i18n.__mf('serverinfo.animated_emotes')}`,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('common.creation_date'),
//               moment(interaction.guild.createdAt).format(
//                 `[${interaction.guild.i18n.__mf(
//                   'common.on'
//                 )}] DD/MM/YYYY [${interaction.guild.i18n.__mf(
//                   'common.at'
//                 )}] HH:mm:ss`
//               ),
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('serverinfo.nitro'),
//               interaction.guild.i18n.__mf('serverinfo.tier', {
//                 tier: interaction.guild.premiumTier,
//                 boost_number: interaction.guild.premiumSubscriptionCount,
//               }),
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('serverinfo.afk'),
//               client.utils.format(afkTimeout),
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('serverinfo.verification_level'),
//               client.config.verificationLVL[
//                 interaction.guild.verificationLevel
//               ],
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('serverinfo.roles', {
//                 role: interaction.guild.roles.cache.size - 1,
//               }),
//               interaction.guild.roles.cache
//                 .filter((r) => r.id !== interaction.guild.id)
//                 .sort((A, B) => B.rawPosition - A.rawPosition)
//                 .map((x) => `${x}`)
//                 .splice(0, 30)
//                 .join(' | ') || '\u200b',
//               false
//             )
//             .setFooter(
//               interaction.guild.i18n.__mf('serverinfo.id', {
//                 id: interaction.guild.id,
//               })
//             )
//             .setThumbnail(interaction.guild.iconURL({ dynamic: true }));
//           interaction.send(embedserv);
//         } else {
//           interaction.send('This command can only be used inside guilds!');
//         }
//         break;
//       }
//       case 'role': {
//         if (interaction.guild) {
//           if(!(role instanceof Role)) role = interaction.guild.roles.resolve(role);
//           const permsArr = joinArray(
//             role.permissions.toArray().map((perm) => `\`${perm}\``)
//           );
//           permsArr
//             .toString()
//             .toLowerCase()
//             .replace(/(^|"|_)(\S)/g, (x) => x.toUpperCase())
//             .replace(/_/g, ' ')
//             .replace(/Use Vad/g, 'Use Voice Activity')
//             .replace(/Guild/g, 'Server');
//           const embed = new MessageEmbed()
//             .setDescription('Permissions\n')
//             .addField(interaction.guild.i18n.__mf('roleinfo.role'), role, true)
//             .addField(
//               interaction.guild.i18n.__mf('roleinfo.role_name'),
//               role.name,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('roleinfo.who_own_it'),
//               role.members.size,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('roleinfo.color'),
//               role.hexColor,
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('common.creation_date'),
//               moment(role.createdAt).format(
//                 `[${interaction.guild.i18n.__mf(
//                   'roleinfo.on'
//                 )}] DD/MM/YYYY [${interaction.guild.i18n.__mf(
//                   'roleinfo.at'
//                 )}] HH:mm:ss`
//               ),
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('roleinfo.hoisted'),
//               role.hoist
//                 ? interaction.guild.i18n.__mf('common.yes')
//                 : interaction.guild.i18n.__mf('common.no'),
//               true
//             )
//             .addField(
//               interaction.guild.i18n.__mf('roleinfo.mentionnable'),
//               role.mentionable
//                 ? interaction.guild.i18n.__mf('common.yes')
//                 : interaction.guild.i18n.__mf('common.no'),
//               true
//             )
//             .addField('Permissions', permsArr)
//             .setFooter(`ID : ${role.id}`)
//             .setColor(role.hexColor);
//           interaction.send(embed);
//         } else {
//           interaction.send("I'm sorry, but you cannot use this command in dms");
//         }
//         break;
//       }
//     }
//   },
// };
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const CommandInteraction = require('../../struct/Interactions/CommandInteraction');
const SlashCommand = require('../../struct/SlashCommand');
const Client = require('../../struct/Client');
module.exports = class InfoSlash extends SlashCommand {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'info',
      description: 'Get infos about a user, a role, or the server',
      global: false,
      commandOptions: [
        {
          name: 'user',
          description: 'Get infos about you, or the specified user',
          type: 1,
          options: [
            {
              name: 'user',
              description: 'User to display',
              type: 6,
              required: false,
            },
          ],
        },
        {
          name: 'server',
          description: 'Get informations about the server.',
          type: 1,
        },
        {
          name: 'role',
          description: 'Get informations to the specified role.',
          type: 1,
          options: [
            {
              name: 'role',
              description: 'Role to display',
              type: 8,
              required: true,
            },
          ],
        },
      ],
    });
  }
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   * @param {*} args
   */
  async execute(interaction, client, args) {}
};
