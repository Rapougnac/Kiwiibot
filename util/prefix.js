const PrefixSchema = require("../models/PrefixSchema")

async function prefix (message, config) {
  let customprefix

  const data = await PrefixSchema.findOne({
    GuildID: message.guild.id,
  }).catch((error) => console.log(error))

  if (data) {
    customprefix = data.Prefix || config.discord.default_prefix.toLowerCase() || "n?";
  }else if (data){
    customprefix = config.discord.default_prefix.toLowerCase() || data.Prefix;
  }
   else {
    customprefix = config.discord.default_prefix.toLowerCase()
  }
  return customprefix;
}

module.exports = { prefix }