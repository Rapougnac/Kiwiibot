const { Message } = require('discord.js');
const Client = require('../struct/Client');
module.exports = {
  name: 'ping',
  description: 'Simple ping command',
  commandOptions: null,
  global: true,
  /**
   *
   * @param {import('../../types/index').Interaction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    client.utils
      .reply(
        interaction,
        `🏓 P${'o'.repeat(
          Math.min(Math.round(client.ws.ping / 100), 1500)
        )}ng \n\`${client.ws.ping}ms\``
      )
      .catch((e) => {
        client.utils.replyEphemeral(
          interaction,
          'There was an error executing that command!'
        );
        console.error(e);
      });
  },
};
