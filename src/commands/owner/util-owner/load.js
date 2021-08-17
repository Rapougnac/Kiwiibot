const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../../struct/Command');
const Client = require('../../../struct/Client');
module.exports = class LoadCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'load',
      aliases: ['lo'],
      description: 'Load a command',
      category: 'owner',
      cooldown: 5,
      utilisation: '{prefix}load [command]',
      ownerOnly: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, [commandName]) {
    if (!commandName)
      return message.inlineReply('No command provided', {
        allowedMentions: {
          repliedUser: false,
        },
      });
    super.load(commandName);
    return message.channel.send('Loaded command!');
  }
};
