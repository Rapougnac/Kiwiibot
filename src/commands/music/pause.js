const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class PauseCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'pause',
      aliases: [],
      description: 'Pause the current music',
      category: 'music',
      cooldown: 5,
      utilisation: '{prefix}pause',
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
        this.config.string[0].format(client.emotes.error)
      );

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        this.config.string[1].format(client.emotes.error)
      );

    if (!client.player.getQueue(message))
      return message.channel.send(
        this.config.string[2].format(client.emotes.error)
      );

    if (client.player.getQueue(message).paused)
      return message.channel.send(
        this.config.string[3].format(client.emotes.error)
      );

    client.player.pause(message);

    message.channel.send(
      this.config.string[4].format(
        client.emotes.success,
        client.player.getQueue(message).playing.title
      )
    );
  }
};
