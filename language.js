const languageSchema = require('./src/models/languageSchema');
const lang = require('./src/assets/json/langs.json');
const Client = require('./src/struct/Client'),
mongoose = require('mongoose');
const guildLanguages = {};
const { Guild } = require('discord.js')
/**
 * @param {Client} client 
 * @param {mongoose} mongoose
 * @returns {Promise<void>}
 */
const loadLanguages = async (client, mongoose) => {
  try {
    for (const guild of client.guilds.cache) {
      const guildID = guild[0];
      if (!mongoose.connections[0]._hasOpened) {
        guildLanguages[guildID] = 'english';
      }
      const result = await languageSchema.findOne({
        _id: guildID,
      });

      guildLanguages[guildID] = result ? result.language : 'english';
    }
  } catch (error) {
    console.error(
      `⚠️[DATABASE ERROR] The database responded with the following error: ${error.name}\n${error}`
    );
  }
};
/**
 * Function to set the language in a guild
 * @param {Guild} guild 
 * @param {String} language 
 */
const setLanguage = (guild, language) => {
  guildLanguages[guild.id] = language.toLowerCase();
};
/**
 * 
 * @param {Guild} guild The guild 
 * @param {String} textID The text id in the langs.json
 * @returns {*}
 */
const language = (guild, textID) => {
  if (guild !== null) {
    if (!lang.translations[textID]) {
      throw new Error(`Unknow text id: ${textID}`);
    }

    const selectedLanguage = guildLanguages[guild.id].toLowerCase();

    return lang.translations[textID][selectedLanguage];
  } else {
    const selectedLanguage = 'english';
    return lang.translations[textID][selectedLanguage];
  }
};

module.exports = { loadLanguages, setLanguage, language };
