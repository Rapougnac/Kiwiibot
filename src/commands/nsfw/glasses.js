const akaneko = require('akaneko');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class GlassesCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'glasses',
      aliases: [],
      description: 'Get a random pic of hentai girls with glasses',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}glasses',
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
      .setTitle(
        `${message.author.tag} here some glasses (I'm a bot but I'm horny...)`
      )
      .setImage(await akaneko.nsfw.glasses());
    this.respond(embed);
  }
};
