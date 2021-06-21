const {
  Message,
  MessageEmbed,
  MessageAttachment,
} = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const moment = require('moment');
require('moment-duration-format');
const languageSchema = require('../../models/languageSchema');
const { convertUFB } = require('../../util/string')
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
      if (message.member.hasPermission('ADMINISTRATOR')) {
        userFlags.push('<:ADMINISTRATOR:827241621270560788>');
      }
      if (member.premiumSinceTimestamp > 0) {
        userFlags.push('<:ServerBooster:850729871477833759>');
      }
      switch (status) {
        case 'dnd': {
          status = this.config.string[0];
          break;
        }
        case 'online': {
          status = this.config.string[1];
          break;
        }
        case 'offline': {
          status = this.config.string[2];
          break;
        }
        case 'idle': {
          status = this.config.string[3];
          break;
        }
      }
      switch (device[0]) {
        case 'web': {
          device[0] = 'Web ' + client.config.clientMap.web;
          break;
        }
        case 'desktop': {
          device[0] = this.config.string[4].format(
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
            _id: message.guild.id,
          },
          (err, data) => {
            if (err) throw err;
            if (!data)
              data = new languageSchema({
                _id: message.guild.id,
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
          this.config.string[5].format(user.tag),
          user.displayAvatarURL({ dynamic: true, format: 'png', size: 512 }),
          'https://discord.com/'
        )
        .setDescription(userFlags.join(' '))
        .addField(this.config.string[6], member, true)
        .addField(this.config.string[7], member.user.tag, true)
        .addField(
          this.config.string[8],
          member.nickname ? `${member.nickname}` : this.config.string[9],
          true
        )
        .addField(
          this.config.string[10],
          moment(member.user.createdAt).format(
            `[${this.config.string[11]}] DD/MM/YYYY [${this.config.string[12]}] HH:mm:ss`
          ) +
            `\n\`${moment(member.user.createdAt, 'DD/MM/YYYY')
              .locale(lang)
              .fromNow()}\``,
          true
        )
        .addField(
          this.config.string[14],
          moment(member.joinedAt).format(
            `[${this.config.string[11]}] DD/MM/YYYY [${this.config.string[12]}] HH:mm:ss`
          ) +
            `\n\`${moment(member.joinedAt, 'DD/MM/YYYY')
              .locale(lang)
              .fromNow()}\``,
          true
        )
        .addField(
          this.config.string[15],
          member.premiumSince
            ? moment(member.premiumSince).format(
                `[${this.config.string[11]}] DD/MM/YYYY [${this.config.string[12]}] HH:mm:ss`
              ) +
                `\n\`${moment(member.premiumSince, 'DD/MM/YYYY')
                  .locale(lang)
                  .fromNow()}\``
            : this.config.string[13],
          true
        )
        .addField('Presence', status, true)
        .addField(this.config.string[16], device[0], true)
        .addField(
          this.config.string[17],
          member.user.bot ? 'Bot' : this.config.string[18],
          true
        )
        .addField(
          this.config.string[19].format(member.roles.cache.size - 1),
          member.roles.cache.size - 1 <= 0
            ? this.config.string[20]
            : member.roles.cache
                .filter((r) => r.id !== message.guild.id)
                .sort((A, B) => B.rawPosition - A.rawPosition)
                .map((x) => `${x}`)
                .splice(0, 50)
                .join(' | ') || '\u200b'
        )
        .setThumbnail(
          member.user.displayAvatarURL({ dynamic: true, size: 4096 })
        )
        .setFooter(`ID : ${member.id}`)
        .setColor(member.displayHexColor || 'GREY');
        // if(member.id === mem.id) {
        //   console.log(this.newPresence, this.oldPresence)
        // }
      message.channel.send(embeduser);
    } else {
      this.inlineReply(this.config.string[21]);
    }
  }
};
