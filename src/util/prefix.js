const PrefixSchema = require('../models/PrefixSchema');
const { Message } = require('discord.js');
// eslint-disable-next-line no-unused-vars
const config = require('../../config');
/**
 * @param {Message} message
 * @param {config} config
 */
async function prefix(message, config) {
  let prefix;
  try {
    if (message.content.startsWith(config.discord.prefix.toLowerCase()))
      return (prefix = config.discord.prefix.toLowerCase());
    if (message.channel.type === 'dm')
      prefix = config.discord.prefix.toLowerCase();
    await PrefixSchema.findOne(
      { GuildID: message.guild?.id },
      function (err, data) {
        if (!data)
          return (prefix = config.discord.prefix.toLowerCase());
        if (!err) prefix = data.Prefix;
        else console.log(err);
      }
    );
    
    if (message.channel.type !== 'dm') return prefix;
    else return config.discord.prefix.toLowerCase();
  } catch (err) {
    console.error(err);
  }
}

module.exports = { prefix };
