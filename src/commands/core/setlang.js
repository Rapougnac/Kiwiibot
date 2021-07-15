const languageSchema = require('../../models/languageSchema');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
module.exports = class SetLangCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setlanguage',
      aliases: ['setlang'],
      description: 'Set the language of the bot',
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
      if (!message.guild.i18n.getLocales().includes(targetedlanguage)) {
        return await message.channel.send(message.guild.i18n.__mf("setlanguage.not_supported_language"));
      }

      message.i18n.setLocale(targetedlanguage)

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
            return await this.inlineReply(message.i18n.__mf("setlanguage.set_language")); 
          });
      } catch (error) {
        await message.channel.send(message.guild.i18n.__mf("common.database_error",{error: error.name}));
      }
    } else {
      return message.channel.send(
        "You can't set a language inside dms, the default langage is `english`"
      );
    }
  }
};
