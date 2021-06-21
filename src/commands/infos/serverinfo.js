const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const Command = require('../../struct/Command');
module.exports = class ServerInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      aliases: ['si', 'servinf', 'servi', 'sinfo'],
      description: '',
      category: 'infos',
      cooldown: 5,
      utilisation: '{prefix}serverinfo',
      string: [],
      guildOnly: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { guild } = message;
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
        this.config.string[7],
        `<@!${message.guild.ownerID}>\n(\`${message.guild.owner.user.tag}\`)`,
        true
      )
      .addField(this.config.string[0], guild.name, true)
      .addField(this.config.string[1], guild.region, true)
      .addField(
        this.config.string[2],
        `${guild.memberCount} ${this.config.string[14]}\n${humancount} ${this.config.string[15]}\n${botcount} ${this.config.string[16]}`,
        true
      )
      .addField(
        this.config.string[3],
        message.guild.members.cache.filter(
          ({ presence }) => presence.status !== 'offline'
        ).size,
        true
      )
      .addField(
        this.config.string[4],
        `${message.guild.channels.cache.size} ${this.config.string[17]}\n${
          message.guild.channels.cache.filter(
            (channel) => channel.type === 'text'
          ).size
        } ${this.config.string[18]}\n${
          message.guild.channels.cache.filter(
            (channel) => channel.type === 'voice'
          ).size
        } ${this.config.string[19]}\n${
          message.guild.channels.cache.filter(
            (channel) => channel.type === 'category'
          ).size
        } ${this.config.string[20]}`,
        true
      )
      .addField(
        this.config.string[5],
        `${message.guild.emojis.cache.size} emojis\n${
          message.guild.emojis.cache.filter((emoji) => !emoji.animated).size
        } ${this.config.string[24]}\n${
          message.guild.emojis.cache.filter((emoji) => emoji.animated).size
        } ${this.config.string[21]}`,
        true
      )
      .addField(
        this.config.string[8],
        moment(message.guild.createdAt).format(
          `[${this.config.string[22]}] DD/MM/YYYY [${this.config.string[23]}] HH:mm:ss`
        ),
        true
      )
      .addField(
        this.config.string[9],
        this.config.string[13].format(
          message.guild.premiumTier,
          message.guild.premiumSubscriptionCount
        ),
        true
      )
      .addField(this.config.string[10], format(afkTimeout), true)
      .addField(
        this.config.string[11],
        client.config.verificationLVL[message.guild.verificationLevel],
        true
      )
      .addField(
        this.config.string[6].format(message.guild.roles.cache.size - 1),
        message.guild.roles.cache
          .filter((r) => r.id !== message.guild.id)
          .sort((A, B) => B.rawPosition - A.rawPosition)
          .map((x) => `${x}`)
          .splice(0, 30)
          .join(' | ') || '\u200b',
        false
      )
      .setFooter(this.config.string[12].format(message.guild.id))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
    message.channel.send(embedserv);
  }
};

const format = (time) => {
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  var ret = '';
  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }
  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return `\`${ret}\``;
};
