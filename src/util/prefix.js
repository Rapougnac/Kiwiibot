const PrefixSchema = require('../models/PrefixSchema');
const { Message } = require('discord.js');
// eslint-disable-next-line no-unused-vars
const config = require('../../config');
const _ = require('lodash');
/**
 * @param {Message} message
 * @param {config} config
 */
async function prefix(message, config) {
  let prefix;
  try {
    if (_.lowerFirst(message.content.startsWith(message.client.prefix)))
      prefix = message.client.prefix;
    if (message.channel.type === 'dm')
      prefix = message.client.prefix;
    await PrefixSchema.findOne(
      { GuildID: message.guild?.id },
      function (err, data) {
        if (err) throw err;
        if (!data)
          return (prefix = message.client.prefix);
        if(message.content.toLowerCase().startsWith(data.Prefix)) prefix = data.Prefix
      }
    );
    
    if (message.channel.type !== 'dm'.substring()) return prefix;
    else return message.client.prefix;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { prefix };
