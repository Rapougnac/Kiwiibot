const prefixSchema = require('../../models/PrefixSchema');
const { confirmation } = require('../../util/confirmation');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class PrefixResetCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'prefix-reset',
      aliases: ['pr', 'clearprefix', 'resetprefix'],
      description: 'Reset the prefix',
      category: 'core',
      cooldown: 5,
      utilisation: '{prefix}prefix-reset',
      permissions: ['MANAGE_MESSAGES'],
      string: [],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    message.channel.send(this.config.string[0]).then(async (msg) => {
      const emoji = await confirmation(
        msg,
        message.author,
        ['✅', '❌'],
        10000
      );
      if (emoji === '✅') {
        msg.delete();
        await prefixSchema.findOneAndDelete({ GuildID: message.guild.id });
        message.channel.send(this.config.string[1].format(client.prefix));
      }
      if (emoji === '❌') {
        msg.delete();
        return message.channel.send(this.config.string[2]);
      }
    });
  }
};
