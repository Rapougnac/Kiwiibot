const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class UptimeCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'uptime',
      aliases: ['up'],
      description: 'Get the uptime of the bot',
      category: 'infos',
      cooldown: 5,
      utilisation: '{prefix}uptime',
      string: [],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const seconds = this.client.utils.parseMs(client.uptime).seconds;
    const minutes = this.client.utils.parseMs(client.uptime).minutes;
    const hours = this.client.utils.parseMs(client.uptime).hours;
    const days = this.client.utils.parseMs(client.uptime).days;
    this.inlineReply(
      `${this.config.string[0].format(
        client.user.username, days, hours, minutes, seconds
      )}`
    );
  }
};