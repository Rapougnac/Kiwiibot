const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const akaneko = require('akaneko');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class BDSMCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'bdsm',
      aliases: [],
      description: 'Get a hentai pic of the bdsm tag',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}bdsm',
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
        `${message.author.tag} here some bdsm (I will leave you with your weird delusions)`,
        message.author.displayAvatarURL({
          dynamic: true,
          size: 512,
          format: 'png',
        })
      )
      .setImage(await akaneko.nsfw.bdsm());
    message.channel.send(embed);
  }
};
