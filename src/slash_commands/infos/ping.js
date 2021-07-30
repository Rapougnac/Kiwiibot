const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const CommandInteraction = require('../../struct/Interactions/CommandInteraction');
const SlashCommand = require('../../struct/SlashCommand');
const Client = require('../../struct/Client');
module.exports = class PingSlashCommand extends SlashCommand {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'ping',
      description: 'Just a simple ping command',
      global: true,
    });
  }
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   * @param {*} args
   */
  async execute(interaction, client, args) {
    interaction.defer({ fetchReply: true }).then((message) => {
      const ping = message.createdTimestamp - interaction.createdTimestamp;
      const str = interaction.guild.i18n.__mf('ping.msg', {
        pong: 'o'.repeat(Math.min(Math.round(ping / 100), 1500)),
        ping: ping,
        heartbeat: client.ws.ping,
      });
      interaction.edit(str);
    });
  }
};
