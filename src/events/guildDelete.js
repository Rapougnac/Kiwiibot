const { Event } = require('../struct/main');
const PrefixSchema = require('../models/PrefixSchema');
const { Guild } = require('discord.js');
module.exports = class GuildDeleteEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'guildDelete',
    });
  }
  /**
   * @param {Guild} guild 
   */
  execute(guild) {
    PrefixSchema.findOne({ GuildID: guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        PrefixSchema.findOneAndDelete({ GuildID: guild.id }).then(
          console.log('deleted data.')
        );
      }
    });
  }
};
