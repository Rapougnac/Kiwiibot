const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const CommandInteraction = require('../../struct/Interactions/CommandInteraction');
const SlashCommand = require('../../struct/SlashCommand');
const Client = require('../../struct/Client');
const { clean, textTruncate } = require('../../util/string');
const util = require('util');
module.exports = class EvalSlashCommand extends SlashCommand {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'eval',
      description: 'Evaluates some javascript code',
      global: true,
      commandOptions: [
        {
          name: 'code',
          description: 'The code to evaluate',
          type: 3,
          required: true,
        },
      ],
    });
  }
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   * @param {{code: string;}} args
   */
  async execute(interaction, client, { code }) {
    if (!this.client.isOwner(interaction.user))
      return interaction.send('This command is limited to devs!', {
        ephemeral: true,
      });
    let res = eval(code);
    if (typeof res !== 'string') res = util.inspect(res);
    res = textTruncate(res, 1500)
    interaction.send(`\`\`\`js\n${clean(res)}\n\`\`\``);
  }
};
