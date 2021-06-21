// module.exports = {
//     name: 'resume',
//     aliases: ['res'],
//     category: 'music',
//     utilisation: '{prefix}resume',

//     async execute(client, message,args) {
//         if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

//         if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

//         if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

//         if (!client.player.getQueue(message).paused) return message.channel.send(`${client.emotes.error} - The music is already playing !`);

//         client.player.resume(message);

//         message.channel.send(`${client.emotes.success} - Song ${client.player.getQueue(message).playing.title} resumed !`);
//     },
// };
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class ResumeCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'resume',
      aliases: ['res'],
      description: 'Resume the paused music',
      category: 'music',
      cooldown: 5,
      utilisation: '{prefix}resume',
      string: [],
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

    if (!client.player.getQueue(message).paused)
      return message.channel.send(
        this.config.string[3].format(client.emotes.error)
      );

    client.player.resume(message);

    message.channel.send(this.config.string[4].format(client.emotes.sucess));
  }
};
