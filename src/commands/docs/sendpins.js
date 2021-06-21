const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class SendPinsCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'sendpins',
      aliases: ['sendpinned'],
      description: 'Sends all pinned message(s)',
      category: 'docs',
      cooldown: 5,
      utilisation: '{prefix}sendpins',
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const pinned = (await message.channel.messages.fetchPinned()).array();
    pinned.reverse();
    let str = String();
    pinned.forEach((pin, count) => {
      str += `**${count + 1}** - ${pin.url} - Auteur: ${pin.author.username}\n`;
    });
    message.channel.send(str);
  }
};
