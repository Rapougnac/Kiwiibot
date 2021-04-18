const PrefixSchema = require("../models/PrefixSchema");
const Client = require("../struct/Client");
const { Guild } = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {Guild} guild 
 */
module.exports = async (client, guild) => {
    PrefixSchema.findOne({ GuildID: guild.id }, async (err, data) => {
        if (err) throw err
        if (data) {
          PrefixSchema.findOneAndDelete({ GuildID: guild.id }).then(
            console.log("deleted data.")
          );
        };
      });
};