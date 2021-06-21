const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class NowPlayingCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'nowplaying',
      aliases: ['np', 'nowp'],
      description: 'Get informations about the curent music',
      category: 'music',
      cooldown: 5,
      utilisation: '{prefix}nowplaying',
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

    const track = client.player.nowPlaying(message);
    const filters = [];

    Object.keys(client.player.getQueue(message).filters).forEach(
      (filterName) => client.player.getQueue(message).filters[filterName]
    )
      ?
        // eslint-disable-next-line no-undef
        filters.push(filterName)
      : false;

    message.channel.send({
      embed: {
        color: 'RED',
        author: { name: track.title },
        fields: [
          { name: this.config.string[3], value: track.author, inline: true },
          {
            name: this.config.string[4],
            value: track.requestedBy.username,
            inline: true,
          },
          {
            name: this.config.string[5],
            value: track.fromPlaylist ? this.config.string[10] : this.config.string[11],
            inline: true,
          },

          { name: this.config.string[6], value: track.views, inline: true },
          { name: this.config.string[7], value: track.duration, inline: true },
          {
            name: this.config.string[8],
            value: filters.length + '/' + client.filters.length,
            inline: true,
          },

          {
            name: 'Volume',
            value: client.player.getQueue(message).volume,
            inline: true,
          },
          {
            name: 'Loop mode',
            value: client.player.getQueue(message).repeatMode ? this.config.string[10] : this.config.string[11],
            inline: true,
          },
          {
            name: this.config.string[9],
            value: client.player.getQueue(message).paused ? this.config.string[10] : this.config.string[11],
            inline: true,
          },

          {
            name: this.config.string[12],
            value: client.player.createProgressBar(message, {
              timecodes: true,
            }),
            inline: true,
          },
        ],
        thumbnail: { url: track.thumbnail },
        timestamp: new Date(),
      },
    });
  }
};
