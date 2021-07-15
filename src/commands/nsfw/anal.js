const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class AnalCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'anal',
      aliases: [],
      description: 'Returns an anal image/gif',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}anal',
      clientPermissions: ['EMBED_LINKS'],
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
    const GIF = await neko.nsfw.anal();
    const { author, channel } = message;
    const { tag } = author;
    const embed = new MessageEmbed()
      .setColor('#202225')
      .setAuthor(
        "",
        author.displayAvatarURL({ dynamic: true, format: 'png', size: 512 }),
        null
      )
      .setImage(GIF.url);
    channel.send(embed);
  }
};
