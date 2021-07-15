const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const akaneko = require('akaneko');
module.exports = class AssCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ass',
      aliases: [],
      description: 'Returns an ass image',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}ass',
      nsfw: true,
      string: [],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const embed = new MessageEmbed()
      .setAuthor("", message.author.displayAvatarURL({ dynamic: true, size: 512, format: 'png' }))
      .setImage(await akaneko.nsfw.ass());
    message.channel.send(embed);
  }
};
