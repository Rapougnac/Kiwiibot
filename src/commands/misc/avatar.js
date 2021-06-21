const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class AvatarCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'avatar',
      aliases: ['pp', 'pfp', 'profilepicture'],
      description: 'Get your avatar ou the specified user',
      category: '',
      cooldown: 5,
      utilisation: '{prefix}avatar <memeber>',
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
    if (message.guild) {
      let embed = new MessageEmbed()
        .setAuthor(`${this.config.string[0].format(member.user.username)}`)
        .setDescription(
          `${this.config.string[1]}(${member.user.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })})`
        )
        .setImage(
          member.user.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })
        )
        .setColor(member.displayHexColor || 'GREY');
      message.channel.send(embed);
    } else {
      let embed = new MessageEmbed()
        .setAuthor(`${this.config.string[0].format(message.author.username)}`)
        .setDescription(
          `${this.config.string[1]}(${message.author.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })})`
        )
        .setImage(
          message.author.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })
        )
        .setColor('GREY');
      message.channel.send(embed);
    }
  }
};
