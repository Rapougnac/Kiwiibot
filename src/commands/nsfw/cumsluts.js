const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class CumSlutsCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'cumsluts',
      aliases: ['cumslulut'],
      description: 'Get a random pic of cumsluts',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}cumsluts',
      nsfw: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const GIF = await neko.nsfw.cumsluts();
    const embed = new MessageEmbed()
      .setColor('#202225')
      .setAuthor(
        `${message.author.tag} here's a random cumsluts image/gif`,
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
