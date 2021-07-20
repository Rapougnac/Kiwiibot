/**@type {import("../../types").SlashCommand} */
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const { stripIndent } = require('common-tags');
module.exports = {
  name: 'docs',
  description: 'Get the docs of discord.js, search Class, or Class#method()',
  global: false,
  commandOptions: [
    {
      name: 'query',
      description: 'The query to search',
      required: true,
      type: 3,
    },
    {
      name: 'target',
      description: 'Target locked !',
      type: 6,
    },
    {
      name: 'source',
      description: "Source d'eau",
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
  /**
   * u
   * @param {import('../struct/Interactions/CommandInteraction')} interaction The interaction
   * @param {import('../struct/Client')} client The client
   * @param {*} args Args
   */
  async execute(interaction, client, { query, target, source }) {
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
        if (target) {
          const embed = new MessageEmbed(data);
          interaction
            .send(embed, {
              response: `Documentation suggestion for <@!${target}>`,
            })
            .catch((e) => console.log(e.message));
        } else {
          const embed = new MessageEmbed(data);
          interaction.send(embed).catch((e) => console.error(e.message));
        }
      }
    });
  },
};
