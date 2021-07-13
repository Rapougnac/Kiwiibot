const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class FilterCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'filter',
      aliases: ['f'],
      description:
        'You can add or disable filters you can see all the filters by doing {prefix}filters',
      category: '',
      cooldown: 5,
      utilisation: '{prefix}filter [filter]',
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

    if (!args[0])
      return message.channel.send(
        message.guild.i18n.__mf("filter.valid_filter",{emote: this.client.emotes.error})
      );

    const filterToUpdate = client.filters.find(
      (x) => x.toLowerCase() === args[0].toLowerCase()
    );

    if (!filterToUpdate)
      return message.channel.send(
        message.guild.i18n.__mf("filter.not_existing_filter",{emote: this.client.emotes.error})
      );

    const filtersUpdated = {};

    filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[
      filterToUpdate
    ]
      ? false
      : true;

    client.player.setFilters(message, filtersUpdated);

    if (filtersUpdated[filterToUpdate])
      message.channel.send(
        message.guild.i18n.__mf("filter.adding_filter",{emote: this.client.emotes.music})
      );
    else
      message.channel.send(
        message.guild.i18n.__mf("filter.removing_filter",{emote: this.client.emotes.music})
      );
  }
};
