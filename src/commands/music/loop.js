// module.exports = {
//     name: 'loop',
//     aliases: ['lp', 'l'],
//     category: 'music',
//     description: 'enable or disable loop mode for the server (play the song again and again)',
//     utilisation: '{prefix}loop',

//     async execute(client, message,args) {
//         if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

//         if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

//         if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

//         if (client.player.getQueue(message).repeatMode) {
//             client.player.setRepeatMode(message, false);
//             return message.channel.send(`${client.emotes.success} - Loop mode **disabled** !`);
//         } else {
//             client.player.setRepeatMode(message, true);
//             return message.channel.send(`${client.emotes.success} - Loop mode **enabled** !`);
//         }
//     },
// };
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class LoopCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'loop',
      aliases: ['lp', 'l'],
      description:
        'Enable or disable loop mode for the server (play the song again and again)',
      category: 'music',
      cooldown: 5,
      utilisation: '{prefix}loop',
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

    if (client.player.getQueue(message).repeatMode) {
      client.player.setRepeatMode(message, false);
      return message.channel.send(
        message.guild.i18n.__mf("loop.disabled",{emote: this.client.emotes.success})
      );
    } else {
      client.player.setRepeatMode(message, true);
      return message.channel.send(
        message.guild.i18n.__mf("loop.enabled",{emote: this.client.emotes.success})
      );
    }
  }
};
