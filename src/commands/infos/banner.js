const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const axios = require('axios');
const UserInfoCommand = require('./userinfo');
const ui = new UserInfoCommand();
module.exports = class BannerCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'banner',
      aliases: [],
      description: 'Get the banner of the specified member',
      category: 'infos',
      cooldown: 5,
      utilisation: '{prefix}banner [user]',
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
            r.user.username
              .toLowerCase()
              .endsWith(args.join(' ').toLowerCase()) ||
            r.user.username.toLowerCase().includes(args.join(' '))
        ) ||
        message.guild.members.cache.find(
          (r) =>
            r.displayName
              .toLowerCase()
              .startsWith(args.join(' ').toLowerCase()) ||
            r.displayName.toLowerCase().endsWith(args.join(' ').toLowerCase())
        );
      if (args.length <= 0) member = message.member;
      const data = await axios.get(
        `https://canary.discord.com/api/v9/users/${member.id}`,
        {
          headers: {
            Authorization: `Bot ${this.client.token}`,
          },
        }
      );
      if(!data.data.banner) {
        return message.channel.send(`Uh..oh, it seems ${member.user.username} don't have a banner on their profile.`);
      }
      const embed = new MessageEmbed()
        .setAuthor(`Here's the ${member.user.username}'s banner.`, member.user.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' }))
        .setImage(ui.displayUserBannerURL(data, member.user, { format: 'png', size: 4096, dynamic: true }));
      message.channel.send(embed)
    } else {
      member = message.author;
      const data = await axios.get(
        `https://canary.discord.com/api/v9/users/${member.id}`,
        {
          headers: {
            Authorization: `Bot ${this.client.token}`,
          },
        }
      );
      if(!data.data.banner) {
        return message.channel.send(`Uh..oh, it seems you don't have a banner on your profile.`);
      }
      const embed = new MessageEmbed()
        .setAuthor(`Here's the ${member.username}'s banner.`, member.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' }))
        .setImage(ui.displayUserBannerURL(data, member, { format: 'png', size: 4096, dynamic: true }));
      message.channel.send(embed)
    }
  }
};
