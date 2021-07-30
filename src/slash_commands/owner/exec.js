const { exec } = require('child_process');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const CommandInteraction = require('../../struct/Interactions/CommandInteraction');
const SlashCommand = require('../../struct/SlashCommand');
const Client = require('../../struct/Client');
const { textTruncate } = require('../../util/string');
module.exports = class SlashCmd extends SlashCommand {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'exec',
      description: 'Execute commands in shell',
      global: true,
      commandOptions: [
        {
          name: 'command',
          description: 'The command to execute',
          type: 3,
          required: true,
        },
      ],
    });
  }
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   * @param {{ command: string }} args
   */
  async execute(interaction, client, { command }) {
    if (!this.client.isOwner(interaction.user))
      return interaction.send('This command is limited to devs only!', {
        ephemeral: true,
      });
    try {
      exec(command, (err, stdout) => {
        let res = stdout || err;
        res = textTruncate(res, 1500);
        interaction.send(`\`\`\`xl\n${res}\n\`\`\``);
      });
    } catch (e) {
      interaction.send(`\`ERROR\`\n\`\`\`xl\n${e}\n\`\`\``);
    }
  }
};
