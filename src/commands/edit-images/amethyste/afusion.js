const AmeClient = require('amethyste-api');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../../struct/Command');
const Client = require('../../../struct/Client');
module.exports = class AfusionCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'fusion',
      aliases: ['afusion'],
      description: 'Fusionnate your profile pictur with the specified member',
      category: 'image-manipulation',
      cooldown: 5,
      utilisation: '{prefix}fusion [member]',
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
    const AmeAPI = new AmeClient(client.config.amethyste.client);
    message.channel.startTyping();
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
    let m = await message.channel.send(message.guild.i18n.__mf("common.wait"));
    const buffer = await AmeAPI.generate('afusion', {
      url: member.user.displayAvatarURL({ format: 'png', size: 2048 }),
      avatar: message.author.displayAvatarURL({ format: 'png', size: 2048 }),
    });
    const attachment = new MessageAttachment(buffer, 'fusion.png');
    m.delete({ timeout: 3000 });
    message.channel.send(attachment);
    message.channel.stopTyping();
  }
};
