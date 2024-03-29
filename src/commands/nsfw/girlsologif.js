const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class GirlSoloGifsCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'girlsologifs',
      aliases: ['girlsologif'],
      description: 'Get a random gif of a solo hentai girl',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}girlsologifs',
      nsfw: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const GIF = await neko.nsfw.girlSoloGif();
    const embed = new MessageEmbed()
      .setColor('#202225')
      .setAuthor(
        `${message.author.tag} here's a random girl solo gif`,
        message.author.displayAvatarURL({
          dynamic: true,
          size: 512,
          format: 'png',
        })
      )
      .setImage(GIF.url);
    message.channel.send(embed);
  }
};
