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
          { name: message.guild.i18n.__mf("nowplaying.channel"), value: track.author, inline: true },
          {
            name: message.guild.i18n.__mf("nowplaying.requested_by"),
            value: track.requestedBy.username,
            inline: true,
          },
          {
            name: message.guild.i18n.__mf("nowplaying.from_playlist"),
            value: track.fromPlaylist ? message.guild.i18n.__mf("common.yes") : message.guild.i18n.__mf("common.no"),
            inline: true,
          },

          { name: message.guild.i18n.__mf("nowplaying.views", {value: track.views, inline: true }),
          { name: message.guild.i18n.__mf("nowplaying.duration", {value: track.duration, inline: true }),
          {
            name: message.guild.i18n.__mf("nowplaying.filters_enabled"),
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
            value: client.player.getQueue(message).repeatMode ? message.guild.i18n.__mf("common.yes")  : message.guild.i18n.__mf("common.no") ,
            inline: true,
          },
          {
            name: message.guild.i18n.__mf("nowplaying.paused"),
            value: client.player.getQueue(message).paused ? message.guild.i18n.__mf("common.yes") : message.guild.i18n.__mf("common.no") ,
            inline: true,
          },

          {
            name: message.guild.i18n.__mf("nowplaying.progress_bar"),
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
