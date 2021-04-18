const PrefixSchema = require("../models/PrefixSchema")
const { Message } = require("discord.js")
const config = require("../../config.json");

/**
 * @param {Message} message 
 * @param {config} config 
 */
async function prefix(message, config) {

  let prefix;
  try {
  if (message.content.startsWith(config.discord.default_prefix.toLowerCase())) return prefix = config.discord.default_prefix.toLowerCase();
    if(message.channel.type === "dm") prefix = config.discord.default_prefix.toLowerCase();
   await PrefixSchema.findOne({GuildID: message.guild?.id}, function(err, data) {
    if(!data) return prefix = config.discord.default_prefix.toLowerCase();
    if (!err) prefix = data.Prefix;
    else console.log(err);
  });

  if(message.channel.type !== "dm") return prefix;
  else return config.discord.default_prefix.toLowerCase();
  } catch (err) {
    console.error(err);
  }

}

module.exports = { prefix }