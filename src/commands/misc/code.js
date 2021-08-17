const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const fs = require('fs');
module.exports = class CodeCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'code',
      aliases: [],
      description: 'Get the code of the specified command',
      category: 'owner',
      cooldown: 5,
      utilisation: '{prefix}code [command]',
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {string[]} args
   */
  async execute(client, message, [commandName]) {
    if (!commandName)
      return message.inlineReply("You didn't provide a command!", {
        allowedMentions: {
          repliedUser: false,
        },
      });
    if (!client.commands.has(commandName))
      return message.inlineReply("This command doesn't exist!", {
        allowedMentions: {
          repliedUser: false,
        },
      });
    const code = fs.readFileSync(this.trace({ command: commandName }), 'utf-8');

    message.channel.send(code, { code: 'js', split: true });
  }
};
