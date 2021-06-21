const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class SayCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'say',
      aliases: [],
      description: 'Say',
      category: 'owner',
      cooldown: 5,
      utilisation: '{prefix}say [message]',
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const msg = args.join(' ');
    message.delete().catch();
    message.channel.send(msg);
  }
};
