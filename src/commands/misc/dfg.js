const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
module.exports = {
  name: 'ret',
  aliases: [],
  description: '',
  category: '',
  utilisation: '{prefix}ret',
  cooldown: 5,
  nsfw: false,
  ownerOnly: false,
  adminOnly: false,
  guildOnly: false,
  permissions: [],
  clientPermissions: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const User =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) => r.user.username.toLowerCase() == args.join(' ').toLowerCase()
      ) ||
      message.guild.members.cache.find(
        (r) => r.displayName.toLowerCase() === args.join(' ').toLowerCase()
      ) ||
      message.guild.members.cache.find(
        (r) => r.nickname.toLowerCase() === args.join(' ').toLowerCase()
      );

    //if(User.toString().length < 1) {
    if (Object.is(User.nickname, User.nickname)) {
      console.log(User.toString().valueOf());
      message.guild.members.cache.forEach(member => {
        console.log(member);
        if(member.nickname === User.nickname) {
          return message.inlineReply("Yes",  {
            allowedMentions: {
              repliedUser: false,
            }
          })
        }
      });
      return message.inlineReply('Work', {
        allowedMentions: {
          repliedUser: false,
        },
      });
    }
    //}
  },
};
