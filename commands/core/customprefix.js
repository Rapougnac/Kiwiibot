const PrefixSchema = require("../../models/PrefixSchema")
const { Message, Client } = require("discord.js")

module.exports = {
  name: "customprefix",
  aliases: ["cp", "custp", "cprefix"],
  category: "Core",
  utilisation: "{prefix}customprefix [prefix]",
  description: "Change the prefix to a new prefix\n⚠️The default prefix is no longer usable!",
  cooldown: 5,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need the `ADMINISTRATOR` permission to use this command!")
    if (!args[0]) {
      return message.channel.send("Please specify a prefix!")
    } else if (args[0].length > 5) {
      return message.channel.send("Error, my prefix cannot be longer than 5 characters!" )
    }

    PrefixSchema.findOne({ GuildID: message.guild.id }, async (err, data) => {
      if (err) return message.channel.send(`⚠️[DATABASE ERROR] The database responded with the following error: ${err.name} \n${err}`)
      if (data) {
       await PrefixSchema.findOneAndDelete({ GuildID: message.guild.id })
        data = new PrefixSchema({
          GuildID: message.guild.id,
          Prefix: args[0],
        })
        data.save()
        message.channel.send(`Your prefix has been updated to **${args[0]}**`)
      } else {
        data = new PrefixSchema({
          GuildID: message.guild.id,
          Prefix: args[0],
        })
        data.save()
        message.channel.send(`Custom prefix in this server is now set to **${args[0]}**`)
      }
    })
  },
}
