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
        message.guild.i18n.__mf("player.common.not_in_channel",{emote: this.client.emotes.error})
      );

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        message.guild.i18n.__mf("player.common.not_in_same_channel",{emote: this.client.emotes.error})
      );

    if (!client.player.getQueue(message))
      return message.channel.send(
        message.guild.i18n.__mf("player.common.no_music_playing",{emote: this.client.emotes.error})
      );

    if (client.player.getQueue(message).paused)
      return message.channel.send(
        message.guild.i18n.__mf("pause.already_paused",{emote: this.client.emotes.error})
      );

    client.player.pause(message);
    const msg = message.guild.i18n.__mf("pause.paused",{emote: this.client.emotes.error, music: client.player.getQueue(message).playing.title});
    message.channel.send(msg);
  }
};
