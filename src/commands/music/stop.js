// const Client = require('../../struct/Client')
// const { Message } = require('discord.js');
// module.exports = {
//     name: 'stop',
//     aliases: [],
//     category: 'music',
//     utilisation: '{prefix}stop',
//     /**
//      *
//      * @param {Client} client
//      * @param {Message} message
//      * @param {String[]} args
//      * @returns
//      */
//     async execute(client, message, args) {
//         if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

//         if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

//         if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

//         client.player.setRepeatMode(message, false);
//         client.player.stop(message);

//         message.channel.send(`${client.emotes.success} - Music **stopped** into this server !`);
//     },
// };
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class StopCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'stop',
      aliases: [],
      description: 'Stop the current music',
      category: 'music',
      cooldown: 5,
      utilisation: '{prefix}',
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

    client.player.setRepeatMode(message, false);
    client.player.stop(message);

    message.channel.send(
      message.guild.i18n.__mf("stop.msg",{emote: client.emotes.sucess})
    );
  }
};
