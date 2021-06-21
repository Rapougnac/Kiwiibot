// const { MessageEmbed, Message, Client } = require('discord.js');

// module.exports = {
//     name: 'queue',
//     aliases: [],
//     category: 'music',
//     utilisation: '{prefix}queue',
//     cooldown: 5,
//     guildOnly: true,
//     adminOnly: false,
//     ownerOnly: false,
//     permissions: [],
//     clientPermissions: ["CONNECT", "SPEAK", "USE_EXTERNAL_EMOJIS"],
//     string: [],
//     /**
//      * @param {Client} client
//      * @param {Message} message
//      * @param {String[]} args
//      */
//     async execute(client, message, args) {
//         if (!message.member.voice.channel) return message.channel.send(this.config.string[0].format(client.emotes.error));

//         if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(this.config.string[1].format(client.emotes.error));

//         const queue = client.player.getQueue(message);

//         if (!client.player.getQueue(message)) return message.channel.send(this.config.string[2].format(client.emotes.error));

//         message.channel.send(`${this.config.string[3].format(message.guild.name, client.emotes.queue, queue.playing.title, queue.playing.author)}` + (queue.tracks.map((track, i) => {
//             return `${this.config.string[4].format(i + 1, track.title, track.author, track.requestedBy.username)}`
//         }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5}` ? `${this.config.string[5].format(queue.tracks.length - 5)}` : `${this.config.string[6].format(queue.tracks.length)}`));
//     },
// };
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class Cmd extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'queue',
      aliases: [],
      description: 'Get the queue of the bot',
      category: 'music',
      cooldown: 5,
      guildOnly: true,
      utilisation: '{prefix}queue',
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

    const queue = client.player.getQueue(message);

    if (!client.player.getQueue(message))
      return message.channel.send(
        this.config.string[2].format(client.emotes.error)
      );
    message.channel.send({
      embed: {
        author: {
          name: message.author.username,
          icon_url: message.author.displayAvatarURL({ dynamic: true }),
        },
        description:
          this.config.string[3].format(
            message.guild.name,
            client.emotes.queue,
            queue.playing.title,
            queue.playing.author
          ) +
          (queue.tracks
            .map((track, i) => {
              return `**#${i + 1}** - ${track.title} | ${track.author} (${
                this.config.string[4]
              } ${track.requestedBy.username})`;
            })
            .slice(0, 5)
            .join('\n') +
            `\n\n${
              queue.tracks.length > 5
                ? this.config.string[5].format(queue.tracks.length - 5)
                : this.config.string[6].format(queue.tracks.length)
            }`),
      },
    });
  }
};
