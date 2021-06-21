const akaneko = require('akaneko');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class GifsCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'gifs',
      aliases: ['gif'],
      description: 'Get a random hentai gif',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}gifs',
      nsfw: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const embed = new MessageEmbed()
      .setAuthor(
        `${message.author.tag} here some gifs (Basically an animated image, so yes :3)`,
        message.author.displayAvatarURL({
          dynamic: true,
          size: 512,
          format: 'png',
        })
      )
      .setImage(await akaneko.nsfw.gifs());
    message.channel.send(embed);
  }
};
