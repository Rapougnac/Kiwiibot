/**@type {import('../../types/index').SlashCommand} */
const { Permissions } = require('discord.js');
// const languageSchema = require('../models/languageSchema');
const prefixSchema = require('../models/PrefixSchema');
module.exports = {
  name: 'set',
  description: 'Set the prefix of the bot',
  global: true,
  commandOptions: [
    {
      name: 'prefix',
      description: 'Set the prefix of the bot',
      type: 1,
      options: [
        {
          name: 'prefix',
          description: 'The prefix to change',
          type: 3,
          required: true,
        },
      ],
    },
    // {
    //   name: 'language',
    //   description: 'Set the language of the bot',
    //   type: 1,
    //   options: [
    //     {
    //       name: 'language',
    //       description: 'The language to set',
    //       type: 3,
    //       required: true,
    //       choices: [
    //         {
    //           name: 'French',
    //           value: 'french',
    //         },
    //         {
    //           name: 'English',
    //           value: 'english',
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
  /**
   *
   * @param {import('../../types').Interaction} interaction
   * @param {import('../struct/Client')} client
   * @param {*} args
   */
  async execute(interaction, client, args) {
    const { guild_id } = interaction;
    const message = {
      guild: {},
    };
    guild_id ? (message.guild = true) : (message.guild = null);
    switch (interaction.data.options[0].name) {
      case 'prefix': {
        if (message.guild) {
          const p = new Permissions(
            Number(interaction.member.permissions)
          ).toArray();
          if (!p.includes('MANAGE_MESSAGES'))
            return client.utils.replyEphemeral(
              interaction,
              'You need the `MANAGE_MESSAGES` permission'
            );
          const prefix = interaction.data.options[0].options[0].value;
          if (prefix.length > 5)
            return client.utils.replyEphemeral(
              interaction,
              'The prefix must be 5 characters or less.'
            );
          prefixSchema
            .findOneAndUpdate(
              {
                GuildID: interaction.guild_id,
              },
              {
                GuildID: interaction.guild_id,
                Prefix: prefix,
              },
              {
                upsert: true,
              }
            )
            .then(() =>
              client.utils.reply(
                interaction,
                `Prefix has been setted to \`${prefix}\` !`
              )
            );
        } else {
          client.utils.reply(
            interaction,
            `You can't set the prefix inside dm's! The prefix is \`${client.prefix}\``
          );
        }
        break;
      }
      // case 'language': {
      //   if (message.guild) {
      //     const p = new Permissions(
      //       Number(interaction.member.permissions)
      //     ).toArray();
      //     if (!p.includes('MANAGE_MESSAGES'))
      //       return client.utils.replyEphemeral(
      //         interaction,
      //         'You need the `MANAGE_MESSAGES` permission'
      //       );
      //     const targetedlanguage = interaction.data.options[0].options[0].value;
      //     const guild = client.guilds.cache.get(interaction.guild_id);
      //     if (!guild.i18n.getLocales().includes(targetedlanguage)) {
      //       return await message.channel.send(guild.i18n.__mf("setlanguage.not_supported_language"));
      //     }
      //     guild.i18n.setLocale(targetedlanguage);
      //     await languageSchema
      //       .findOneAndUpdate(
      //         {
      //           _id: guild.id,
      //         },
      //         {
      //           _id: guild.id,
      //           language: targetedlanguage,
      //         },
      //         {
      //           upsert: true,
      //         }
      //       )
      //       .then(async () => {
      //           return await client.utils.reply(
      //             interaction,
      //             message.i18n.__mf("setlanguage.set_language")
      //           );
      //       });
      //   } else {
      //     client.utils.reply(interaction, 'You can\'t set the language inside dm\'s! The default language is `english`')
      //   }
      //   break;
      // }
    }
  },
};
