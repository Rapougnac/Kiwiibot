const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class GasmCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'gasm',
      aliases: [],
      description: 'Get a random pic of an hentai orgasm',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}gasm',
      nsfw: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const self = this;
    const GIF = await neko.nsfw.gasm();
    const embed = new MessageEmbed()
      .setColor('#202225')
      .setAuthor(`${message.author.tag} here's a random orgasm image`, message.author.displayAvatarURL({ dynamic: true, size: 512, format: 'png' }))
      .setImage(GIF.url);
    self.respond(embed)
  }
};
