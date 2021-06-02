const { MessageEmbed, Client, Message } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const languageSchema = require('../../models/languageSchema');
module.exports = {
  name: 'userinfo',
  aliases: ['ui', 'whois'],
  description: 'Shows informations about you or a user',
  category: 'infos',
  utilisation: '{prefix}userinfo <member>',
  guildOnly: true,
  adminOnly: false,
  ownerOnly: false,
  permissions: [],
  clientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL'],
  string: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
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
      ) ||
      args[0] ||
      message.member;
    const user = member.user;
    let status = user.presence.status;
    const userFlags = await user
      .fetchFlags()
      .then((flags) =>
        Promise.resolve(
          Object.entries(flags.serialize()).filter(([_, val]) => !!val)
        )
      )
      .then((flags) =>
        flags.map(
          ([key, _]) =>
            client.emojis.cache.find((x) => x.name === key)?.toString() || key
        )
      )
      .catch(() => []);
    const Device = user.presence.clientStatus;
    let device = Object.getOwnPropertyNames(Device || {});
    if (Device === null) {
      device[0] = 'N/A';
    }
    if (Device === undefined) {
      device[0] = 'N/A';
    }
    if (!Device) {
      device[0] = 'N/A';
    }
    if (message.guild.ownerID === user.id) {
      userFlags.push('<:GUILD_OWNER:812992729797230592>');
    }
    if (message.member.hasPermission('ADMINISTRATOR')) {
      userFlags.push('<:ADMINISTRATOR:827241621270560788>');
    }
    switch (status) {
      case 'dnd': {
        status = this.string[0];
        break;
      }
      case 'online': {
        status = this.string[1];
        break;
      }
      case 'offline': {
        status = this.string[2];
        break;
      }
      case 'idle': {
        status = this.string[3];
        break;
      }
    }
    switch (device[0]) {
      case 'web': {
        device[0] = 'Web ' + client.config.clientMap.web;
        break;
      }
      case 'desktop': {
        device[0] = this.string[4].format(client.config.clientMap.desktop);
        break;
      }
      case 'mobile': {
        device[0] = 'Mobile ' + client.config.clientMap.mobile;
        break;
      }
    }
    let lang;
    try {
      await languageSchema.findOne({
        _id: message.guild.id,
      }).then((val) => lang = val.language)
      switch(lang) {
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
        this.string[5].format(user.tag),
        user.displayAvatarURL({ dynamic: true, format: 'png', size: 512 }),
        'https://discord.com/'
      )
      .setDescription(userFlags.join(' '))
      .addField(this.string[6], member, true)
      .addField(this.string[7], member.user.tag, true)
      .addField(
        this.string[8],
        member.nickname ? `${member.nickname}` : this.string[9],
        true
      )
      .addField(
        this.string[10],
        moment(member.user.createdAt).format(
          `[${this.string[11]}] DD/MM/YYYY [${this.string[12]}] HH:mm:ss`
        ) + `\n\`${moment(member.user.createdAt, 'DD/MM/YYYY').locale(lang).fromNow()}\``,
        true
      )
      .addField(
        this.string[14],
        moment(member.joinedAt).format(
          `[${this.string[11]}] DD/MM/YYYY [${this.string[12]}] HH:mm:ss`
        ) +
          `\n\`${moment(member.joinedAt, 'DD/MM/YYYY')
            .locale(lang)
            .fromNow()}\``,
        true
      )
      .addField(
        this.string[15],
        member.premiumSince
          ? moment(member.premiumSince).format(
              `[${this.string[11]}] DD/MM/YYYY [${this.string[12]}] HH:mm:ss`
            ) + `\n\`${moment(member.premiumSince, 'DD/MM/YYYY').locale(lang).fromNow()}\``
          : this.string[13],
        true
      )
      .addField('Presence', status, true)
      .addField(this.string[16], device[0], true)
      .addField(
        this.string[17],
        member.user.bot ? 'Bot' : this.string[18],
        true
      )
      .addField(
        this.string[19].format(member.roles.cache.size - 1),
        member.roles.cache.size - 1 <= 0
          ? this.string[20]
          : member.roles.cache
              .filter((r) => r.id !== message.guild.id)
              .sort((A, B) => B.rawPosition - A.rawPosition)
              .map((x) => `${x}`)
              .splice(0, 50)
              .join(' | ') || '\u200b'
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
      .setFooter(`ID : ${member.id}`)
      .setColor(member.displayHexColor || 'GREY');
    message.channel.send(embeduser);
  },
};
