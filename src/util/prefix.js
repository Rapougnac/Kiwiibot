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
    if (message.content.startsWith(message.client.prefix))
      return (prefix = message.client.prefix);
    if (message.channel.type === 'dm')
      prefix = message.client.prefix;
    await PrefixSchema.findOne(
      { GuildID: message.guild?.id },
      function (err, data) {
        if (!data)
          return (prefix = message.client.prefix);
        if (!err) prefix = data.Prefix;
        else console.log(err);
      }
    );
    
    if (message.channel.type !== 'dm'.substring()) return prefix;
    else return message.client.prefix;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { prefix };
