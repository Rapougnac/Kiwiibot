/* eslint-disable no-unused-vars */
const {
  Message,
  MessageEmbed,
  MessageAttachment,
  User,
} = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const moment = require('moment');
require('moment-duration-format');
const languageSchema = require('../../models/languageSchema');
const { convertUFB } = require('../../util/string');
module.exports = class UserInfoCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'userinfo',
      aliases: ['ui'],
      description: 'Shows informations about you or a user',
      category: 'infos',
      cooldown: 5,
      utilisation: '{prefix}userinfo <user>',
      guildOnly: true,
      clientPermissions: ['EMBED_LINKS'],
      string: [],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
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
    if (member) {
      const user = member.user;
      let status = user.presence.status;
      const userFlags = await user
        .fetchFlags()
        .then((flags) => convertUFB(flags))
        .then((flags) =>
          flags.map(
            (key) =>
              client.emojis.cache.find((x) => x.name === key)?.toString() || key
          )
        )
        .catch(() => []);
      const Device = user.presence.clientStatus;
      let device = Object.getOwnPropertyNames(Device || {});
      switch (Device) {
        default: {
          device[0] = 'N/A';
        }
      }
      if (message.guild.ownerID === user.id) {
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
        user.hasBanner()
      ) {
        userFlags.push('<:Discord_Nitro:859137224187707402>');
      }
      if (this.client.isOwner(user)) {
        userFlags.push('<:Bot_Owner:864234649960972298>');
      }
      switch (status) {
        case 'dnd': {
          status = message.guild.i18n.__mf('userinfo.dnd');
          break;
        }
        case 'online': {
          status = message.guild.i18n.__mf('userinfo.online');
          break;
        }
        case 'offline': {
          status = message.guild.i18n.__mf('userinfo.offline');
          break;
        }
        case 'idle': {
          status = message.guild.i18n.__mf('userinfo.idle');
          break;
        }
      }
      switch (device[0]) {
        case 'web': {
          device[0] = 'Web ' + client.config.clientMap.web;
          break;
        }
        case 'desktop': {
          device[0] = message.guild.i18n.__mf('userinfo.desktop', {
            x: client.config.clientMap.desktop,
          });
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
            _id: message.guild.id,
          },
          (err, data) => {
            if (err) throw err;
            if (!data)
              data = new languageSchema({
                _id: message.guild.id,
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
          message.guild.i18n.__mf('userinfo.user', { tag: user.tag }),
          user.displayAvatarURL({ dynamic: true, format: 'png', size: 512 }),
          'https://discord.com/'
        )
        .setDescription(userFlags.join(' '))
        .addField(message.guild.i18n.__mf('userinfo.member'), member, true)
        .addField(
          message.guild.i18n.__mf('userinfo.name'),
          member.user.tag,
          true
        )
        .addField(
          message.guild.i18n.__mf('userinfo.nickname'),
          member.nickname
            ? `${member.nickname}`
            : message.guild.i18n.__mf('userinfo.not_set'),
          true
        )
        .addField(
          message.guild.i18n.__mf('common.creation_date'),
          moment(member.user.createdAt).format(
            `[${message.guild.i18n.__mf(
              'common.on'
            )}] DD/MM/YYYY [${message.guild.i18n.__mf('common.at')}] HH:mm:ss`
          ) +
            `\n\`${moment(member.user.createdAt, 'DD/MM/YYYY')
              .locale(lang)
              .fromNow()}\``,
          true
        )
        .addField(
          message.guild.i18n.__mf('userinfo.arrival_date'),
          moment(member.joinedAt).format(
            `[${message.guild.i18n.__mf(
              'common.on'
            )}] DD/MM/YYYY [${message.guild.i18n.__mf('common.at')}] HH:mm:ss`
          ) +
            `\n\`${moment(member.joinedAt, 'DD/MM/YYYY')
              .locale(lang)
              .fromNow()}\``,
          true
        )
        .addField(
          message.guild.i18n.__mf('userinfo.boost_start_date'),
          member.premiumSince
            ? moment(member.premiumSince).format(
                `[${message.guild.i18n.__mf(
                  'common.on'
                )}] DD/MM/YYYY [${message.guild.i18n.__mf(
                  'common.at'
                )}] HH:mm:ss`
              ) +
                `\n\`${moment(member.premiumSince, 'DD/MM/YYYY')
                  .locale(lang)
                  .fromNow()}\``
            : message.guild.i18n.__mf('userinfo.not_boosting'),
          true
        )
        .addField('Presence', status, true)
        .addField(message.guild.i18n.__mf('userinfo.device'), device[0], true)
        .addField(
          message.guild.i18n.__mf('userinfo.type'),
          member.user.bot ? 'Bot' : message.guild.i18n.__mf('userinfo.user2'),
          true
        )
        .addField(
          message.guild.i18n.__mf('userinfo.roles', {
            role: member.roles.cache.size - 1,
          }),
          member.roles.cache.size - 1 <= 0
            ? message.guild.i18n.__mf('userinfo.no_roles')
            : member.roles.cache
                .filter((r) => r.id !== message.guild.id)
                .sort((A, B) => B.rawPosition - A.rawPosition)
                .map((x) => `${x}`)
                .splice(0, 50)
                .join(' | ') || '\u200b'
        )
        .setThumbnail(
          user.displayAvatarURL({
            size: 4096,
            format: 'png',
            dynamic: true,
          })
        )
        .setFooter(`ID : ${member.id}`)
        .setColor(member.displayHexColor || 'GREY');
        if(user.hasBanner()) {
          embeduser.setImage(await user.displayBannerURL({ format: 'png', size: 4096, dynamic: true }))
        }
      message.channel.send(embeduser);
    } else {
      this.inlineReply(message.guild.i18n.__mf('userinfo.cant_find_member'));
    }
  }
};
