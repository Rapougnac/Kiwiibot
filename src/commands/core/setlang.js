const { Client, Message, MessageEmbed } = require('discord.js');
const { languages } = require('../../assets/json/langs.json');
const languageSchema = require('../../models/languageSchema');
const { setLanguage } = require('../../../language');
module.exports = {
  name: 'setlanguage',
  aliases: ['setlang'],
  description: '',
  category: '',
  utilisation: '{prefix}setlanguage [language]',
  cooldown: 5,
  nsfw: false,
  ownerOnly: false,
  adminOnly: true,
  guildOnly: true,
  permissions: [],
  clientPermissions: [],
  string: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (message.guild) {
      const targetedlanguage = args[0].toLowerCase();
      if (!languages.includes(targetedlanguage)) {
        return await message.channel.send(this.string[0]);
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
            if (targetedlanguage === 'english') {
              await message.inlineReply('Language has been setted!', {
                allowedMentions: {
                  repliedUser: false,
                },
              });
            } else if(targetedlanguage === 'french') {
              await message.inlineReply('La langue a bien été définie !', {
                allowedMentions: {
                  repliedUser: false,
                },
              });
            }
          });
      } catch (error) {
        await message.channel.send(this.string[2].format(error.name));
      }
    } else {
      return message.channel.send(
        "You can't set a language inside dms, the default langage is `english`"
      );
    }
  },
};
