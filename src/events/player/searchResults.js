// eslint-disable-next-line no-unused-vars
const { Track } = require('discord-player');
const Client = require('../../struct/Client');
const { Message } = require('discord.js');
const { language } = require('../../../language');
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String} query
 * @param {Track} tracks
 */
module.exports = (client, message, query, tracks) => {
  message.channel.send({
    embed: {
      color: 'BLUE',
      author: {
        name: language(message.guild, 'searchResults')[0].format(query),
      },
      timestamp: new Date(),
      description: `${tracks
        .map((t, i) => `**${i + 1}** - ${t.title}`)
        .join('\n')}`,
    },
  });
};
