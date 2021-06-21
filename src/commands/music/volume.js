const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class VolumeCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'volume',
      aliases: ['vol'],
      description: 'Set the volume of the music',
      category: 'music',
      cooldown: 5,
      utilisation: '{prefix}volume [1-100]',
      string: [],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const string = this.config.string;
    if (!message.member.voice.channel)
      return message.channel.send(
        string[0].format(client.emotes.error)
      );

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        string[1].format(client.emotes.error)
      );

    if (!client.player.getQueue(message))
      return message.channel.send(
        string[2].format(client.emotes.error)
      );

    if (!args[0] || isNaN(args[0]))
      return message.channel.send(
        string[3].format(client.emotes.error)
      );

    if (
      Math.round(parseInt(args[0])) < 1 ||
      Math.round(parseInt(args[0])) > 100
    )
      return message.channel.send(
        string[3].format(client.emotes.error)
      );

    client.player.setVolume(message, args[0]);

    message.channel.send(
      string[4].format(client.emotes.success, parseInt(args[0]))
    );
  }
};
