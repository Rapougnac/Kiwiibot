const { Message } = require('discord.js');
const Client = require('../struct/Client');
module.exports = {
  name: 'ping',
  description: 'Simple ping command',
  commandOptions: null,
  global: true,
  /**
   *
   * @param {import('../struct/Interactions/CommandInteraction')} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    interaction
      .send(
        `🏓 P${'o'.repeat(
          Math.min(Math.round(client.ws.ping / 100), 1500)
        )}ng \n\`${client.ws.ping}ms\``
      )
      .catch(console.error);
  },
};
