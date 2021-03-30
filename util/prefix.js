const PrefixSchema = require("../models/PrefixSchema")

prefix = async function(message, config) {
    let customprefix;
  
    const data = await PrefixSchema.findOne({
      GuildID: message.guild.id,
    }).catch((error) => console.log(error))
  
    if (data) {
      customprefix = data.Prefix;
    }else if (data){
      customprefix = config.discord.default_prefix.toLowerCase() || data.Prefix;
    }
    else if (message.content.startsWith('n?')){
      customprefix = 'n?'
    } else if (message.content.startsWith(config.discord.default_prefix)){
      customprefix = config.discord.default_prefix;
    } //else if (data.Prefix && message.content.startsWith(data.Prefix)){
    //   customprefix = data.Prefix;
    // };
    return customprefix;
}

module.exports = { prefix }