const { languages } = require('../../assets/json/langs.json');
const languageSchema = require('../../models/languageSchema');
const { setLanguage } = require('../../../language');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
module.exports = class SetLangCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setlanguage',
      aliases: ['setlang'],
      description: '',
      category: 'core',
      cooldown: 5,
      utilisation: '{prefix}setlang [language]',
      permissions: ['MANAGE_MESSAGES'],
      guildOnly: true,
      string: [],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, [language]) {
    if (message.guild) {
      const targetedlanguage = language.toLowerCase();
      if (!languages.includes(targetedlanguage)) {
        return await message.channel.send(message.guild.i18n.__mf("setlanguage.not_supported_language"));
      }

      setLanguage(message.guild, targetedlanguage);

      try {
        await languageSchema
          .findOneAndUpdate(
            {
              _id: message.guild.id,
            },
            {
              _id: message.guild.id,
              language: targetedlanguage,
            },
            {
              upsert: true,
            }
          )
          .then(async () => {
            switch (targetedlanguage) {
              case 'english': {
                return await this.inlineReply('Language has been setted!');
              }
              case 'french': {
                return await this.inlineReply( 'La langue a bien été définie !');
              }
              case 'italian': {
                return await this.inlineReply('La lingua è stata impostata!')
              }
            }
          });
      } catch (error) {
        await message.channel.send(message.guild.i18n.__mf("common.database_error"),{error: error.name});
      }
    } else {
      return message.channel.send(
        "You can't set a language inside dms, the default langage is `english`"
      );
    }
  }
};
