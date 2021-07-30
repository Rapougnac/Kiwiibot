const { exec } = require('child_process');
const {
  Message,
  MessageEmbed,
  MessageAttachment,
  Util,
} = require('discord.js');
const CommandInteraction = require('../../struct/Interactions/CommandInteraction');
const SlashCommand = require('../../struct/SlashCommand');
const Client = require('../../struct/Client');
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
        interaction.defer({ fetchReply: true }).then(async(message) => {
          message.channel.send(res, { split: true, code: 'js' });
          interaction.edit('­Here\'s the execution result!');
        });
      });
    } catch (e) {
      interaction.send(`\`ERROR\`\n\`\`\`xl\n${e}\n\`\`\``);
    }
  }
};
