const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
  name: 'avatar',
  aliases: [],
  description: 'Get the avatar of yourself ou the specified member (★ ω ★)',
  category: 'misc',
  utilisation: '{prefix}avatar <member>',
  cooldown: 10,
  nsfw: false,
  adminOnly: false,
  ownerOnly: false,
  guildOnly: false,
  permissions: [],
  clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
  string: [],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    try {
      if (message.guild) {
        const User =
          message.mentions.members.first() ||
          message.guild.members.cache.get(args[0]) ||
          message.guild.members.cache.find(
            (r) => r.user.username.toLowerCase() == args.join(' ').toLowerCase()
          ) ||
          message.guild.members.cache.find(
            (r) => r.displayName.toLowerCase() === args.join(' ').toLowerCase()
          ) ||
          message.member;

        let embed = new MessageEmbed()
          .setAuthor(`${this.string[0].format(User.user.username)}`)
          .setDescription(
            `${this.string[1]}(${User.user.displayAvatarURL({
              size: 4096,
              dynamic: true,
              format: 'png',
            })})`
          )
          .setImage(
            User.user.displayAvatarURL({
              size: 4096,
              dynamic: true,
              format: 'png',
            })
          )
          .setColor(User.displayHexColor || 'GREY');
        message.channel.send(embed);
      } else {
        let embed = new MessageEmbed()
          .setAuthor(`${this.string[0].format(message.author.username)}`)
          .setDescription(
            `${this.string[1]}(${message.author.displayAvatarURL({
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
    } catch (err) {
      message.channel.send(err);
    }
  },
};
