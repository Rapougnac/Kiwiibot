const PrefixSchema = require("../models/PrefixSchema")
const { Message } = require("discord.js")
const config = require("../../config.json");
/**
 * @param {Message} message 
 * @param {config} config 
 */
async function prefix(message, config) {
  const data = await PrefixSchema.findOne({
    GuildID: message.guild?.id,
  }).catch((error) => console.log(error))
  let prefix;
  if(message.channel.type !== "dm"){
  if(message.content.startsWith("m?")){
    prefix = "m?";
  } else if (message.content.startsWith(config.discord.default_prefix.toLowerCase())) {
    prefix = config.discord.default_prefix.toLowerCase();
  } else if (data.Prefix && message.content.startsWith(data.Prefix)){
    prefix = data.Prefix;
  }
  } else {
    if(message.content.startsWith("m?")){
      prefix = "m?";
    } else if (message.content.startsWith(config.discord.default_prefix)) {
      prefix = config.discord.default_prefix;
    }
  }
  return prefix;
}

module.exports = { prefix }