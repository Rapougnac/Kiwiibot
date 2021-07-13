/**
 *
 * @param {import('../../struct/Client')} client
 * @param {import('discord.js').Message} message
 * @param {import('discord-player').Queue} queue
 */
module.exports = (client, message, queue) => {
  message.channel.send(
    message.guild.i18n.__mf("player.events.queueEnd"),{emote: client.emotes.error}
  );
};
