const languageSchema = require('./src/models/languageSchema');
const PrefixSchema = require('./src/models/PrefixSchema');
const Client = require('./src/struct/Client'),
  mongoose = require('mongoose');
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
        guild[1].i18n.setLocale('en');
      }
      const result = await languageSchema.findOne({
        _id: guildID,
      });
      guild[1].i18n.setLocale(result ? result.language : 'en');
    }
  } catch (error) {
    console.error(
      `⚠️[DATABASE ERROR] The database responded with the following error: ${error.name}\n${error}`
    );
  }
};

const loadPrefix = async (client) => {
  try {
    for (const [guildID, guild] of client.guilds.cache) {
      await PrefixSchema.findOne({ GuildID: guildID }, (err, data) => {
        if (data !== null) {
          guild.prefix = data.Prefix;
        }
      });
    }
  } catch (error) {
    console.error(
      `⚠️[DATABASE ERROR] The database responded with the following error: ${error.name}\n${error}`
    );
  }
};

module.exports = { loadLanguages, loadPrefix };
