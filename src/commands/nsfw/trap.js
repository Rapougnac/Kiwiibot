const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class TrapCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'trap',
      aliases: [],
      description: 'Get a rondom pic of a trap',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}trap',
      nsfw: true,
      clientPermissions: ['EMBED_LINKS', 'ATTACH_FILES'],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const GIF = await neko.nsfw.trap();
    const embed = new MessageEmbed()
      .setColor('#202225')
      .setAuthor(
        `${message.author.tag} here's a random trap image/gif`,
        message.author.displayAvatarURL({
          format: 'png',
          size: 512,
          dynamic: true,
        })
      )
      .setImage(GIF.url);
    message.channel.send(embed);
  }
};
