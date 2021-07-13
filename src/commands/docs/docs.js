const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const axios = require('axios');
module.exports = class DocsCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'docs',
      aliases: ['doc', 'documentation'],
      description:
        'Get the djs doc in an embed, you can specify the source by doing `--src {source}` (without the brackets) The sources are listed here: `stable`, `master`, `commando`, `rpc`, `akairo`, `akairo-master` and `collection`',
      category: 'docs',
      cooldown: 5,
      utilisation: '{prefix}docs [query] <--src> <[source]>',
      string: []
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const sources = [
      'stable',
      'master',
      'commando',
      'rpc',
      'akairo',
      'akairo-master',
      'collection',
    ];
    const query = args.join(' ').split(/ +--src/g)[0];
    if (!query) return this.inlineReply(message.guild.i18n.__mf("docs.missing_query"));
    let source;
    if (message.content.includes('--src')) {
      source = args[args.length - 1];
      if(sources.indexOf(source) === -1) return this.respond(message.guild.i18n.__mf("docs.valid_sources"));
      const url = `https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${encodeURIComponent(
        query
      )}`;
      axios.get(url).then(({ data }) => {
        if (data) {
          message.channel.send({ embed: data });
        } else {
          return message.channel.send(message.guild.i18n.__mf("docs.docs_fetch_error"));
        }
      });
    } else {
      source = 'stable';
      const url = `https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${encodeURIComponent(
        query
      )}`;
      axios.get(url).then(({ data }) => {
        if (data) {
          message.channel.send({ embed: data });
        } else {
          return message.channel.send(message.guild.i18n.__mf("docs.docs_fetch_error"));
        }
      });
    }
  }
};
