const akaneko = require('akaneko');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class DoujinCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'doujin',
      aliases: [],
      description: 'Get a random pic of a doujin page',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}doujin',
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
      .setAuthor(`${message.author.tag} here some doujin (hanime is better)`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 512 }))
      .setImage(await akaneko.nsfw.doujin());
    message.channel.send(embed);
  }
};
