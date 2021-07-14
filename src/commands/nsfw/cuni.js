const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class CuniCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'cuni',
      aliases: [],
      description: 'Get a random pic of cunilingus',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}cuni',
      nsfw: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const GIF = await neko.nsfw.kuni();
    const embed = new MessageEmbed()
      .setColor('#202225')
      .setAuthor(
        `${message.author.tag} here's a random cunilingus image/gif`,
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
