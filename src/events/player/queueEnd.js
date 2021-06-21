/**
 *
 * @param {import('../../struct/Client')} client
 * @param {import('discord.js').Message} message
 * @param {import('discord-player').Queue} queue
 */
 const { language } = require('../../../language');
module.exports = (client, message, queue) => {
  message.channel.send(
    language(message.guild, 'queueEnd')[0].format(client.emotes.error)
  );
};
