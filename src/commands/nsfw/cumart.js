const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class CumArtCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'cumart',
      aliases: [],
      description: 'Get a pic of cumart hentai',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}cumart',
      nsfw: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const nekoclient = require('nekos.life');
    const neko = new nekoclient();
    const GIF = await neko.nsfw.cumArts();
    const embed = new MessageEmbed()
      .setColor('#202225')
      .setAuthor(
        `${message.author.tag} here's a random cumart image/gif`,
        message.author.displayAvatarURL({
          dynamic: true,
          format: 'png',
          size: 512,
        })
      )
      .setImage(GIF.url);
    message.channel.send(embed);
  }
};
