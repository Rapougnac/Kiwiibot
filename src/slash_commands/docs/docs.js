const {
  Message,
  MessageEmbed,
  MessageAttachment,
  // eslint-disable-next-line no-unused-vars
  User,
} = require('discord.js');
const CommandInteraction = require('../../struct/Interactions/CommandInteraction');
const SlashCommand = require('../../struct/SlashCommand');
const Client = require('../../struct/Client');
const axios = require('axios');
const { stripIndent } = require('common-tags');
module.exports = class DocsSlashCommand extends SlashCommand {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'docs',
      description: 'Get the docs of discord.js or other sources avaliables',
      global: false,
      commandOptions: [
        {
          name: 'query',
          description: 'Search class, or class#method()',
          type: 3,
          required: true,
        },
        {
          name: 'user',
          description: 'The user to mention',
          required: false,
          type: 6,
        },
        {
          name: 'source',
          description: 'The source to srap the doc',
          type: 3,
          choices: [
            {
              name: 'stable branch (#stable) [default]',
              value: 'stable',
            },
            {
              name: 'master branch (#master)',
              value: 'master',
            },
            {
              name: 'commando framework',
              value: 'commando',
            },
            {
              name: 'rpc - Rich Presence',
              value: 'rpc',
            },
            {
              name: 'akairo - Akairo framework',
              value: 'akairo',
            },
            {
              name: 'akairo-master - Akairo framework (#master)',
              value: 'akairo-master',
            },
            {
              name: 'collection - Util Structure',
              value: 'collection',
            },
          ],
        },
      ],
    });
  }
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   * @param {{query: string; user?: User; source?: string;}} args
   */
  async execute(interaction, client, { query, user, source }) {
    if (!source) source = 'stable';
    const url = `https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${encodeURIComponent(
      query
    )}`;
    axios.get(url).then(({ data }) => {
      if (!data)
        return interaction.send(
          stripIndent`
          \`❌ Error\` "${query}" was not found!
          Try an another query !`,
          {
            ephemeral: true,
          }
        );
      else {
        if (user) {
          const embed = new MessageEmbed(data);
          interaction
            .send(embed, {
              response: `Documentation suggestion for ${user}`,
            })
            .catch((e) => console.log(e.message));
        } else {
          const embed = new MessageEmbed(data);
          interaction.send(embed).catch((e) => console.error(e.message));
        }
      }
    });
  }
};
