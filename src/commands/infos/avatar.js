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
      category: 'infos',
      cooldown: 5,
      utilisation: '{prefix}avatar <member>',
      string: [],
      clientPermissions: ['EMBED_LINKS'],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    let member;
    if (message.guild) {
      member =
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
        ) ||
        message.guild.members.cache.find((r) =>
          r.user.username.toLowerCase().includes(args.join(' '))
        );
      if (args.length <= 0) member = message.member;
      let embed = new MessageEmbed()
        .setAuthor(`${message.guild.i18n.__mf("avatar.avatar_of",{avatar: member.user.username})}`)
        .setDescription(
          `${message.guild.i18n.__mf("avatar.msg")}(${member.user.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })})\n\nFormat: [webp](${member.user.displayAvatarURL({
            size: 4096,
          })}) • [jpg](${member.user.displayAvatarURL({
            format: 'jpg',
            size: 4096,
          })}) • [jpeg](${member.user.displayAvatarURL({
            format: 'jpeg',
            size: 4096,
          })}) • [png](${member.user.displayAvatarURL({
            format: 'png',
            size: 4096,
          })}) ${
            member.user.avatar.startsWith('a_')
              ? ` • [gif](${member.user.displayAvatarURL({
                  dynamic: true,
                  format: 'gif',
                  size: 4096,
                })})`
              : ''
          }`
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
      member = message.author;
      let embed = new MessageEmbed()
        .setAuthor(`${message.guild.i18n.__mf("avatar.avatar_of",{avatar: member.user.username})}`)
        .setDescription(
          `${message.guild.i18n.__mf("avatar.msg")}(${member.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })})\n\nFormat: [webp](${member.user.displayAvatarURL({
            size: 4096,
          })}) • [jpg](${member.user.displayAvatarURL({
            format: 'jpg',
            size: 4096,
          })}) • [jpeg](${member.user.displayAvatarURL({
            format: 'jpeg',
            size: 4096,
          })}) • [png](${member.user.displayAvatarURL({
            format: 'png',
            size: 4096,
          })}) ${
            member.user.avatar.startsWith('a_')
              ? ` • [gif](${member.user.displayAvatarURL({
                  dynamic: true,
                  format: 'gif',
                  size: 4096,
                })})`
              : ''
          }`
        )
        .setImage(
          member.displayAvatarURL({
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
