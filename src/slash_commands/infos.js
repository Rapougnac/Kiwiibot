const { convertUFB, joinArray, checkLang } = require('../util/string');
const { language } = require('../../language');
const languageSchema = require('../models/languageSchema');
const { MessageEmbed, Message, RoleManager } = require('discord.js');
const moment = require('moment');
/**@type {import('../../types/index').SlashCommand} */
module.exports = {
  name: 'info',
  description: 'Get infos about the server, a user, or a role.',
  global: true,
  commandOptions: [
    {
      name: 'user',
      description: 'Get infos about you, or the specified user.',
      type: 1,
      options: [
        {
          name: 'user',
          description: 'The user to display',
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
  /**
   *
   * @param {import('../../types/index').Interaction} interaction
   * @param {import('../struct/Client')} client
   * @param {*} args
   */
  async execute(interaction, client, args) {
    console.log(interaction);
    const { guild_id } = interaction;
    const message = {
      guild: {},
    };
    guild_id ? (message.guild = { id: guild_id }) : (message.guild = null);
    switch (interaction.data.options[0].name) {
      case 'user': {
        if (message.guild) {
          let User = interaction.data?.options[0].options
            ? interaction.data.options[0].options[0].value
            : null;
          if (!User) User = interaction.member.user.id;
          const user = await client.users.fetch(User);
          const guild = client.guilds.cache.get(guild_id);
          const member = guild.member(user);
          let status = member.user.presence.status;
          const userFlags = await user
            .fetchFlags()
            .then((flags) => convertUFB(flags))
            .then((flags) =>
              flags.map(
                (key) =>
                  client.emojis.cache.find((x) => x.name === key)?.toString() ||
                  key
              )
            )
            .catch(console.error);
          const Device = user.presence.clientStatus;
          let device = Object.getOwnPropertyNames(Device || {});
          switch (Device) {
            case null: {
              device[0] = 'N/A';
              break;
            }
            case undefined: {
              device[0] = 'N/A';
              break;
            }
            case !Device: {
              device[0] = 'N/A';
              break;
            }
          }
          if (guild.ownerID === user.id) {
            userFlags.push('<:GUILD_OWNER:812992729797230592>');
          }
          if (member.hasPermission('ADMINISTRATOR')) {
            userFlags.push('<:ADMINISTRATOR:827241621270560788>');
          }
          if (member.premiumSinceTimestamp > 0) {
            userFlags.push('<:ServerBooster:850729871477833759>');
          }
          if (
            (user.avatar && user.avatar.startsWith('a_')) ||
            member.premiumSince ||
            client.isOwner(member)
          ) {
            userFlags.push('<:Discord_Nitro:859137224187707402>');
          }
          if (client.isOwner(user)) {
            userFlags.push('<:Bot_Owner:864234649960972298>');
          }
          switch (status) {
            case 'dnd': {
              status = language(guild, 'userinfo')[0];
              break;
            }
            case 'online': {
              status = language(guild, 'userinfo')[1];
              break;
            }
            case 'offline': {
              status = language(guild, 'userinfo')[2];
              break;
            }
            case 'idle': {
              status = language(guild, 'userinfo')[3];
              break;
            }
          }
          switch (device[0]) {
            case 'web': {
              device[0] = 'Web ' + client.config.clientMap.web;
              break;
            }
            case 'desktop': {
              device[0] = language(guild, 'userinfo')[4].format(
                client.config.clientMap.desktop
              );
              break;
            }
            case 'mobile': {
              device[0] = 'Mobile ' + client.config.clientMap.mobile;
              break;
            }
          }
          let lang;
          try {
            await languageSchema.findOne(
              {
                _id: guild.id,
              },
              (err, data) => {
                if (err) throw err;
                if (!data)
                  data = new languageSchema({
                    _id: guild.id,
                    language: 'english',
                  });
                lang = data.language;
              }
            );
            if (!lang) lang = 'english';
            switch (lang) {
              case 'english': {
                lang = 'en';
                break;
              }
              case 'french': {
                lang = 'fr-ch';
                break;
              }
            }
          } catch (e) {
            console.error(e);
          }
          const embeduser = new MessageEmbed()
            .setAuthor(
              language(guild, 'userinfo')[5].format(user.tag),
              member.user.displayAvatarURL({
                dynamic: true,
                format: 'png',
                size: 512,
              }),
              'https://discord.com/'
            )
            .setDescription(userFlags.join(' '))
            .addField(language(guild, 'userinfo')[6], member, true)
            .addField(language(guild, 'userinfo')[7], user.tag, true)
            .addField(
              language(guild, 'userinfo')[8],
              member.nickname
                ? `${member.nickname}`
                : language(guild, 'userinfo')[9],
              true
            )
            .addField(
              language(guild, 'userinfo')[10],
              moment(user.createdAt).format(
                `[${language(guild, 'userinfo')[11]}] DD/MM/YYYY [${
                  language(guild, 'userinfo')[12]
                }] HH:mm:ss`
              ) +
                `\n\`${moment(user.createdAt, 'DD/MM/YYYY')
                  .locale(lang)
                  .fromNow()}\``,
              true
            )
            .addField(
              language(guild, 'userinfo')[14],
              moment(member.joinedAt).format(
                `[${language(guild, 'userinfo')[11]}] DD/MM/YYYY [${
                  language(guild, 'userinfo')[12]
                }] HH:mm:ss`
              ) +
                `\n\`${moment(member.joinedAt, 'DD/MM/YYYY')
                  .locale(lang)
                  .fromNow()}\``,
              true
            )
            .addField(
              language(guild, 'userinfo')[15],
              member.premiumSince
                ? moment(member.premiumSince).format(
                    `[${language(guild, 'userinfo')[11]}] DD/MM/YYYY [${
                      language(guild, 'userinfo')[12]
                    }] HH:mm:ss`
                  ) +
                    `\n\`${moment(member.premiumSince, 'DD/MM/YYYY')
                      .locale(lang)
                      .fromNow()}\``
                : language(guild, 'userinfo')[13],
              true
            )
            .addField('Presence', status, true)
            .addField(language(guild, 'userinfo')[16], device[0], true)
            .addField(
              language(guild, 'userinfo')[17],
              user.bot ? 'Bot' : language(guild, 'userinfo')[18],
              true
            )
            .addField(
              language(guild, 'userinfo')[19].format(
                member.roles.cache.size - 1
              ),
              member.roles.cache.size - 1 <= 0
                ? language(guild, 'userinfo')[20]
                : member.roles.cache
                    .filter((r) => r.id !== guild.id)
                    .sort((A, B) => B.rawPosition - A.rawPosition)
                    .map((x) => `${x}`)
                    .splice(0, 50)
                    .join(' | ') || '\u200b'
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setFooter(`ID : ${user.id}`)
            .setColor(member.displayHexColor || 'GREY');
          client.utils.reply(interaction, embeduser);
        } else {
          const guild = null;
          const user = await client.users.fetch(interaction.user.id);
          let lang = 'en';
          let status = user.presence.status;
          const userFlags = await user
            .fetchFlags()
            .then((flags) => convertUFB(flags))
            .then((flags) =>
              flags.map(
                (key) =>
                  client.emojis.cache.find((x) => x.name === key)?.toString() ||
                  key
              )
            )
            .catch(console.error);
          const Device = user.presence.clientStatus;
          let device = Object.getOwnPropertyNames(Device || {});
          switch (Device) {
            case null: {
              device[0] = 'N/A';
              break;
            }
            case undefined: {
              device[0] = 'N/A';
              break;
            }
            case !Device: {
              device[0] = 'N/A';
              break;
            }
          }
          if (
            (user.avatar && user.avatar.startsWith('a_')) ||
            client.isOwner(user)
          ) {
            userFlags.push('<:Discord_Nitro:859137224187707402>');
          }
          if (client.isOwner(user)) {
            userFlags.push('<:Bot_Owner:864234649960972298>');
          }
          switch (status) {
            case 'dnd': {
              status = language(guild, 'userinfo')[0];
              break;
            }
            case 'online': {
              status = language(guild, 'userinfo')[1];
              break;
            }
            case 'offline': {
              status = language(guild, 'userinfo')[2];
              break;
            }
            case 'idle': {
              status = language(guild, 'userinfo')[3];
              break;
            }
          }
          switch (device[0]) {
            case 'web': {
              device[0] = 'Web ' + client.config.clientMap.web;
              break;
            }
            case 'desktop': {
              device[0] = language(guild, 'userinfo')[4].format(
                client.config.clientMap.desktop
              );
              break;
            }
            case 'mobile': {
              device[0] = 'Mobile ' + client.config.clientMap.mobile;
              break;
            }
          }

          const embeduser = new MessageEmbed()
            .setAuthor(
              language(guild, 'userinfo')[5].format(user.tag),
              user.displayAvatarURL({
                dynamic: true,
                format: 'png',
                size: 512,
              }),
              'https://discord.com/'
            )
            .setDescription(userFlags.join(' '))
            .addField(language(guild, 'userinfo')[6], `<@${user.id}>`, true)
            .addField(language(guild, 'userinfo')[7], user.tag, true)
            .addField(
              language(guild, 'userinfo')[10],
              moment(user.createdAt).format(
                `[${language(guild, 'userinfo')[11]}] DD/MM/YYYY [${
                  language(guild, 'userinfo')[12]
                }] HH:mm:ss`
              ) +
                `\n\`${moment(user.createdAt, 'DD/MM/YYYY')
                  .locale(lang)
                  .fromNow()}\``,
              true
            )
            .addField('Presence', status, true)
            .addField(language(guild, 'userinfo')[16], device[0], true)
            .addField(
              language(guild, 'userinfo')[17],
              user.bot ? 'Bot' : language(guild, 'userinfo')[18],
              true
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setFooter(`ID : ${user.id}`)
            .setColor('GREY');
          client.utils.reply(interaction, embeduser);
        }
        break;
      }
      case 'server': {
        if (message.guild) {
          const guild = client.guilds.cache.get(guild_id);
          const { afkTimeout } = guild;
          const botcount = guild.members.cache.filter(
            (member) => member.user.bot
          ).size;
          const humancount = guild.members.cache.filter(
            (member) => !member.user.bot
          ).size;
          const embedserv = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
            .addField(
              language(guild, 'serverinfo')[7],
              `<@!${guild.ownerID}>\n(\`${guild.owner.user.tag}\`)`,
              true
            )
            .addField(language(guild, 'serverinfo')[0], guild.name, true)
            .addField(language(guild, 'serverinfo')[1], guild.region, true)
            .addField(
              language(guild, 'serverinfo')[2],
              `${guild.memberCount} ${
                language(guild, 'serverinfo')[14]
              }\n${humancount} ${
                language(guild, 'serverinfo')[15]
              }\n${botcount} ${language(guild, 'serverinfo')[16]}`,
              true
            )
            .addField(
              language(guild, 'serverinfo')[3],
              guild.members.cache.filter(
                ({ presence }) => presence.status !== 'offline'
              ).size,
              true
            )
            .addField(
              language(guild, 'serverinfo')[4],
              `${guild.channels.cache.size} ${
                language(guild, 'serverinfo')[17]
              }\n${
                guild.channels.cache.filter(
                  (channel) => channel.type === 'text'
                ).size
              } ${language(guild, 'serverinfo')[18]}\n${
                guild.channels.cache.filter(
                  (channel) => channel.type === 'voice'
                ).size
              } ${language(guild, 'serverinfo')[19]}\n${
                guild.channels.cache.filter(
                  (channel) => channel.type === 'category'
                ).size
              } ${language(guild, 'serverinfo')[20]}`,
              true
            )
            .addField(
              language(guild, 'serverinfo')[5],
              `${guild.emojis.cache.size} emojis\n${
                guild.emojis.cache.filter((emoji) => !emoji.animated).size
              } ${language(guild, 'serverinfo')[24]}\n${
                guild.emojis.cache.filter((emoji) => emoji.animated).size
              } ${language(guild, 'serverinfo')[21]}`,
              true
            )
            .addField(
              language(guild, 'serverinfo')[8],
              moment(guild.createdAt).format(
                `[${language(guild, 'serverinfo')[22]}] DD/MM/YYYY [${
                  language(guild, 'serverinfo')[23]
                }] HH:mm:ss`
              ),
              true
            )
            .addField(
              language(guild, 'serverinfo')[9],
              language(guild, 'serverinfo')[13].format(
                guild.premiumTier,
                guild.premiumSubscriptionCount
              ),
              true
            )
            .addField(
              language(guild, 'serverinfo')[10],
              client.utils.format(afkTimeout),
              true
            )
            .addField(
              language(guild, 'serverinfo')[11],
              client.config.verificationLVL[guild.verificationLevel],
              true
            )
            .addField(
              language(guild, 'serverinfo')[6].format(
                guild.roles.cache.size - 1
              ),
              guild.roles.cache
                .filter((r) => r.id !== guild.id)
                .sort((A, B) => B.rawPosition - A.rawPosition)
                .map((x) => `${x}`)
                .splice(0, 30)
                .join(' | ') || '\u200b',
              false
            )
            .setFooter(language(guild, 'serverinfo')[12].format(guild.id))
            .setThumbnail(guild.iconURL({ dynamic: true }));
          client.utils.reply(interaction, embedserv);
        } else {
          client.utils.reply(
            interaction,
            'This command can only be used inside guilds!'
          );
        }
        break;
      }
      case 'role': {
        if (message.guild) {
          await checkLang(message);
          const guild = client.guilds.cache.get(guild_id);
          const role = await new RoleManager(guild).fetch(
            interaction.data.options[0].options[0].value
          );
          const permsArr = joinArray(
            role.permissions.toArray().map((perm) => `\`${perm}\``)
          );
          permsArr
            .toString()
            .toLowerCase()
            .replace(/(^|"|_)(\S)/g, (x) => x.toUpperCase())
            .replace(/_/g, ' ')
            .replace(/Use Vad/g, 'Use Voice Activity')
            .replace(/Guild/g, 'Server');
          const embed = new MessageEmbed()
            .setDescription('Permissions\n')
            .addField(language(guild, 'roleinfo')[1], role, true)
            .addField(language(guild, 'roleinfo')[2], role.name, true)
            .addField(language(guild, 'roleinfo')[3], role.members.size, true)
            .addField(language(guild, 'roleinfo')[4], role.hexColor, true)
            .addField(
              language(guild, 'roleinfo')[5],
              moment(role.createdAt).format(
                `[${language(guild, 'roleinfo')[6]}] DD/MM/YYYY [${
                  language(guild, 'roleinfo')[7]
                }] HH:mm:ss`
              ),
              true
            )
            .addField(
              language(guild, 'roleinfo')[8],
              role.hoist
                ? language(guild, 'roleinfo')[9]
                : language(guild, 'roleinfo')[10],
              true
            )
            .addField(
              language(guild, 'roleinfo')[11],
              role.mentionable
                ? language(guild, 'roleinfo')[9]
                : language(guild, 'roleinfo')[10],
              true
            )
            .addField('Permissions', permsArr)
            .setFooter(`ID : ${role.id}`)
            .setColor(role.hexColor);
          client.utils.reply(interaction, embed);
        } else {
          client.utils.replyEphemeral(
            interaction,
            "I'm sorry, but you cannot use this command in dms"
          );
        }
        //   const djsMess = new Message(
        //     client,
        //     message,
        //     client.channels.cache.get(message.channel_id)
        //   );
        //   console.log(djsMess)
        //     const message = await client.api
        //     .webhooks(client.user.id, interaction.token)
        //     .messages('@original')
        //     .patch({ data: {} });
        //   console.log(message); // Discord raw message object
        break;
      }
    }
  },
};
