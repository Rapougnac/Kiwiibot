const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../../struct/Command');
const Client = require('../../../struct/Client');
const { upperFirst } = require('lodash');
module.exports = class UnloadCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'unload',
      aliases: ['ul'],
      description: 'Unload a command',
      category: 'owner',
      cooldown: 5,
      utilisation: '{prefix}unload [command name]',
      ownerOnly: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, [commandName]) {
    const options = {
      allowedMentions: {
        repliedUser: false,
      },
    };
    if (!commandName)
      return message.inlineReply("You didn't provide a command!", options);
    if (!(client.commands.has(commandName) || client.aliases.has(commandName)))
      return message.inlineReply(
        `The command \`${commandName}\` hasn't be found, please, try again`,
        options
      );
    const command =
      client.commands.get(commandName) || client.aliases.get(commandName);
    commandName = command.help.name;
    super.unload(commandName);
    return message.channel.send(
      `\`${upperFirst(commandName)}\` has successfully been unloaded!`
    );
  }
};
