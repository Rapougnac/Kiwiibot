const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class FeetCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'feet',
      aliases: [],
      description: 'Get a random pic of a feet',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}feet',
      nsfw: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const GIF = await neko.nsfw.feet();
    const embed = new MessageEmbed()
      .setColor('#202225')
      .setAuthor(`${message.author.tag} here's a random feet image`, message.author.displayAvatarURL({ dynamic: true, size: 512, format: 'png' }))
      .setImage(GIF.url);
    message.channel.send(embed);
  }
};
