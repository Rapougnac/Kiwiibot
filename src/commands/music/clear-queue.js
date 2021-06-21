const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class ClearQueueCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'clear-queue',
      aliases: ['cq'],
      description: 'Clear the current queue',
      category: 'music',
      cooldown: 5,
      utilisation: '{prefix}clear-queue',
      string: [],
      guildOnly: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!message.member.voice.channel)
      return message.channel.send(
        this.config.string[0].format(this.client.emotes.error)
      );

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        this.config.string[1].format(this.client.emotes.error)
      );

    if (!client.player.getQueue(message))
      return message.channel.send(
        this.config.string[2].format(this.client.emotes.error)
      );

    client.player.clearQueue(message);

    message.channel.send(
      this.config.string[3].format(this.client.emotes.success)
    );
  }
};
