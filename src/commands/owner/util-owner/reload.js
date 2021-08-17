const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../../struct/Command');
const Client = require('../../../struct/Client');
const { upperFirst } = require('lodash');
module.exports = class ReloadCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'reload',
      aliases: ['rel'],
      description: 'Reload a command',
      category: 'owner',
      cooldown: 5,
      utilisation: '{prefix}reload [command name]',
      ownerOnly: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, [commandName]) {
    if (!commandName) return message.inlineReply('Provide command');
    super.reload(commandName);
    return message.inlineReply(`\`${upperFirst(commandName)}\` has been reloaded !`);
  }
};
