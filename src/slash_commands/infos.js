const { convertUFB, joinArray, checkLang } = require('../util/string');
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
            client.owners.includes(member.id)
          ) {
            userFlags.push('<:Discord_Nitro:859137224187707402>');
          }
          switch (status) {
            case 'dnd': {
              status = guild.i18n.__mf("userinfo.dnd");
              break;
            }
            case 'online': {
              status = guild.i18n.__mf("userinfo.online");
              break;
            }
            case 'offline': {
              status = guild.i18n.__mf("userinfo.offline");
              break;
            }
            case 'idle': {
              status = guild.i18n.__mf("userinfo.idle");
              break;
            }
          }
          switch (device[0]) {
            case 'web': {
              device[0] = 'Web ' + client.config.clientMap.web;
              break;
            }
            case 'desktop': {
              device[0] = guild.i18n.__mf("userinfo.desktop",{x: client.config.clientMap.desktop})
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
                    language: 'en',
                  });
                lang = data.language;
              }
            );
            if (!lang) lang = 'en'; 
          } catch (e) {
            console.error(e);
          }
          const embeduser = new MessageEmbed()
            .setAuthor(
              guild.i18n.__mf("userinfo.user",{tag: user.tag}),
              member.user.displayAvatarURL({
                dynamic: true,
                format: 'png',
                size: 512,
              }),
              'https://discord.com/'
            )
            .setDescription(userFlags.join(' '))
            .addField(guild.i18n.__mf("userinfo.member"), member, true)
            .addField(guild.i18n.__mf("userinfo.name"), user.tag, true)
            .addField(
              guild.i18n.__mf("userinfo.nickname"),
              member.nickname
                ? `${member.nickname}`
                : message.guild.i18n.__mf("userinfo.not_set"),
              true
            )
            .addField(
              guild.i18n.__mf("userinfo.account_creation_date"),
              moment(user.createdAt).format(
                `[${guild.i18n.__mf("common.on")}] DD/MM/YYYY [${
                  guild.i18n.__mf("common.at")
                }] HH:mm:ss`
              ) +
                `\n\`${moment(user.createdAt, 'DD/MM/YYYY')
                  .locale(lang)
                  .fromNow()}\``,
              true
            )
            .addField(
              guild.i18n.__mf("userinfo.arrival_date"),
              moment(member.joinedAt).format(
                `[${guild.i18n.__mf("common.on")}] DD/MM/YYYY [${
                  guild.i18n.__mf("common.at")
                }] HH:mm:ss`
              ) +
                `\n\`${moment(member.joinedAt, 'DD/MM/YYYY')
                  .locale(lang)
                  .fromNow()}\``,
              true
            )
            .addField(
              guild.i18n.__mf("userinfo.boost_start_date"),
              member.premiumSince
                ? moment(member.premiumSince).format(
                    `[${guild.i18n.__mf("common.on")}] DD/MM/YYYY [${
                      guild.i18n.__mf("common.at")
                    }] HH:mm:ss`
                  ) +
                    `\n\`${moment(member.premiumSince, 'DD/MM/YYYY')
                      .locale(lang)
                      .fromNow()}\``
                : guild.i18n.__mf("userinfo.not_boosting"),
              true
            )
            .addField('Presence', status, true)
            .addField(guild.i18n.__mf("userinfo.device"), device[0], true)
            .addField(
              guild.i18n.__mf("userinfo.type"),
              user.bot ? 'Bot' : guild.i18n.__mf("userinfo.user2"),
              true
            )
            .addField(
              guild.i18n.__mf("userinfo.roles",{role: member.roles.cache.size - 1}),
              member.roles.cache.size - 1 <= 0
                ? message.guild.i18n.__mf("userinfo.no_roles")
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
          const user = await client.users.fetch(interaction.member.user.id);
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
          switch (status) {
            case 'dnd': {
              status = guild.i18n.__mf("userinfo.dnd");
              break;
            }
            case 'online': {
              status = guild.i18n.__mf("userinfo.online");
              break;
            }
            case 'offline': {
              status = guild.i18n.__mf("userinfo.offline");
              break;
            }
            case 'idle': {
              status = guild.i18n.__mf("userinfo.idle");
              break;
            }
          }
          switch (device[0]) {
            case 'web': {
              device[0] = 'Web ' + client.config.clientMap.web;
              break;
            }
            case 'desktop': {
              device[0] = guild.i18n.__mf("userinfo.desktop",{x: client.config.clientMap.desktop});
              break;
            }
            case 'mobile': {
              device[0] = 'Mobile ' + client.config.clientMap.mobile;
              break;
            }
          }

          const embeduser = new MessageEmbed()
            .setAuthor(
              guild.i18n.__mf("userinfo.user",{tag: user.tag}),
              user.displayAvatarURL({
                dynamic: true,
                format: 'png',
                size: 512,
              }),
              'https://discord.com/'
            )
            .setDescription(userFlags.join(' '))
            .addField(guild.i18n.__mf("userinfo.member"), `<@${user.id}>`, true)
            .addField(guild.i18n.__mf("userinfo.name"), user.tag, true)
            .addField(
              guild.i18n.__mf("userinfo.account_creation_date"),
              moment(user.createdAt).format(
                `[${guild.i18n.__mf("common.on")}] DD/MM/YYYY [${
                  guild.i18n.__mf("common.at")
                }] HH:mm:ss`
              ) +
                `\n\`${moment(user.createdAt, 'DD/MM/YYYY')
                  .locale(lang)
                  .fromNow()}\``,
              true
            )
            .addField('Presence', status, true)
            .addField(guild.i18n.__mf("userinfo.device"), device[0], true)
            .addField(
              guild.i18n.__mf("userinfo.type"),
              user.bot ? 'Bot' : guild.i18n.__mf("userinfo.user2"),
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
              guild.i18n.__mf("serverinfo.owner"),
              `<@!${guild.ownerID}>\n(\`${guild.owner.user.tag}\`)`,
              true
            )
            .addField(guild.i18n.__mf("serverinfor.name"), guild.name, true)
            .addField(guild.i18n.__mf("serverinfor.region"), guild.region, true)
            .addField(
              guild.i18n.__mf("serverinfor.members"),
              `${guild.memberCount} ${
                guild.i18n.__mf('serverinfo.members2')
              }\n${humancount} ${
                guild.i18n.__mf('serverinfo.humans')
              }\n${botcount} ${guild.i18n.__mf('serverinfo.bots')}`,
              true
            )
            .addField(
              guild.i18n.__mf('serverinfo.online_members'),
              guild.members.cache.filter(
                ({ presence }) => presence.status !== 'offline'
              ).size,
              true
            )
            .addField(
              guild.i18n.__mf('serverinfo.channels'),
              `${guild.channels.cache.size} ${
                guild.i18n.__mf('serverinfo.channels2')
              }\n${
                guild.channels.cache.filter(
                  (channel) => channel.type === 'text'
                ).size
              } ${guild.i18n.__mf('serverinfo.text_channels')}\n${
                guild.channels.cache.filter(
                  (channel) => channel.type === 'voice'
                ).size
              } ${guild.i18n.__mf('serverinfo.voice_channels')}\n${
                guild.channels.cache.filter(
                  (channel) => channel.type === 'category'
                ).size
              } ${guild.i18n.__mf('serverinfo.category')}`,
              true
            )
            .addField(
              guild.i18n.__mf('serverinfo.emotes'),
              `${guild.emojis.cache.size} emojis\n${
                guild.emojis.cache.filter((emoji) => !emoji.animated).size
              } ${guild.i18n.__mf('serverinfo.static_emotes')}\n${
                guild.emojis.cache.filter((emoji) => emoji.animated).size
              } ${message.guild.i18n.__mf('serverinfo.animated_emotes')}`,
              true
            )
            .addField(
              guild.i18n.__mf('common.creation_date'),
              moment(guild.createdAt).format(
                `[${guild.i18n.__mf('common.on')}] DD/MM/YYYY [${
                  guild.i18n.__mf('common.at')
                }] HH:mm:ss`
              ),
              true
            )
            .addField(
              guild.i18n.__mf('serverinfo.nitro'),
              guild.i18n.__mf('serverinfo.tier',{
                tier: message.guild.premiumTier,
                boost_number: message.guild.premiumSubscriptionCount
              }),
              true
            )
            .addField(
              guild.i18n.__mf('serverinfo.afk'),
              client.utils.format(afkTimeout),
              true
            )
            .addField(
              guild.i18n.__mf('serverinfo.verification_level'),
              client.config.verificationLVL[guild.verificationLevel],
              true
            )
            .addField(
              guild.i18n.__mf('serverinfo.roles',{role: message.guild.roles.cache.size - 1}),
              guild.roles.cache
                .filter((r) => r.id !== guild.id)
                .sort((A, B) => B.rawPosition - A.rawPosition)
                .map((x) => `${x}`)
                .splice(0, 30)
                .join(' | ') || '\u200b',
              false
            )
            .setFooter(language(guild.i18n.__mf('serverinfo.id',{id: message.guild.id}))
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
            .addField(guild.i18n.__mf("roleinfo.role"), role, true)
            .addField(guild.i18n.__mf("roleinfo.role_name"), role.name, true)
            .addField(guild.i18n.__mf("roleinfo.who_own_it"), role.members.size, true)
            .addField(guild.i18n.__mf("roleinfo.color"), role.hexColor, true)
            .addField(
              guild.i18n.__mf("common.creation_date"),
              moment(role.createdAt).format(
                `[${guild.i18n.__mf("roleinfo.on")}] DD/MM/YYYY [${
                  guild.i18n.__mf("roleinfo.at")
                }] HH:mm:ss`
              ),
              true
            )
            .addField(
              guild.i18n.__mf("roleinfo.hoisted"),
              role.hoist
                ? guild.i18n.__mf("common.yes")
                : guild.i18n.__mf("common.no"),
              true
            )
            .addField(
              guild.i18n.__mf("roleinfo.mentionnable"),
              role.mentionable
                ? guild.i18n.__mf("common.yes")
                : guild.i18n.__mf("common.no"),
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
