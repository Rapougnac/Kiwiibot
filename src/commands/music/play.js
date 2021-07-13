const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class PlayCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'play',
      aliases: ['p'],
      description: 'Play a music',
      category: 'music',
      cooldown: 5,
      utilisation: '{prefix}play [query or link]',
      guildOnly: true,
      string: [],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    try {
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

      if (!args[0])
        return message.channel.send(
          message.guild.i18n.__mf("play.missing_title",{emote: client.emotes.error})
        );

      client.player.play(message, args.join(' '));
    } catch (e) {
      message.channel.send(message.guild.i18n.__mf("play.error",{error: e}));
    }
  }
};
