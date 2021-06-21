const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class WFilters extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'w-filters',
      aliases: ['filters'],
      description: 'List of all filters enabled or disabled',
      category: 'music',
      cooldown: 5,
      utilisation: '{prefix}w-filters',
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

    const filtersStatuses = [[], []];

    client.filters.forEach((filterName) => {
      const array =
        filtersStatuses[0].length > filtersStatuses[1].length
          ? filtersStatuses[1]
          : filtersStatuses[0];
      array.push(
        filterName.charAt(0).toUpperCase() +
          filterName.slice(1) +
          ' : ' +
          (client.player.getQueue(message).filters[filterName]
            ? client.emotes.success
            : client.emotes.off)
      );
    });

    message.channel.send({
      embed: {
        color: 'ORANGE',
        fields: [
          {
            name: this.config.string[3],
            value: filtersStatuses[0].join('\n'),
            inline: true,
          },
          { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
        ],
        timestamp: new Date(),
        description: this.config.string[4].format(client.prefix),
      },
    });
  }
};
