const PrefixSchema = require('../../models/PrefixSchema');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class SetPrefixCommand extends Command {
   /** 
    *@param {Client} client 
    */ 
  constructor(client) {
    super(client, {
      name: 'setprefix',
      aliases: ['setp'],
      description: 'Change the default prefix to the specified prefix, you can still use the default prefix',
      category: 'core',
      cooldown: 5,
      utilisation: '{prefix}setprefix [prefix]',
      permissions: ['MANAGE_MESSAGES'],
      string: [],
    });
  }
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, [prefix]) {
        if (!prefix) {
      return message.channel.send(message.guild.i18n.__mf('setprefix.missing_prefix'));
    } else if (prefix.length > 5) {
      return message.channel.send(message.guild.i18n.__mf('setprefix.prefix_length'));
    }

    PrefixSchema.findOne({ GuildID: message.guild.id }, async (err, data) => {
      if (err) return message.channel.send(message.guild.i18n.__mf('common.database_error'),{error: err.name});
      if (data) {
        await PrefixSchema.findOneAndDelete({ GuildID: message.guild.id });
        data = new PrefixSchema({
          GuildID: message.guild.id,
          Prefix: prefix,
        });
        data.save();
        message.channel.send(message.guild.i18n.__mf('setprefix.updated_prefix'),{prefix: prefix});
      } else {
        data = new PrefixSchema({
          GuildID: message.guild.id,
          Prefix: prefix,
        });
        data.save();
        message.guild.prefix(prefix)
        message.channel.send(message.guild.i18n.__mf('setprefix.new_prefix'),{prefix: prefix});
      }
    });
  }
};