const { Client, Message, MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'docs',
  aliases: ['doc', 'documentation'],
  description: 'Get the djs doc in an embed, you can spefify the source by doing `--src {source}` (without the brackets) The sources are listed here: `stable`, `master`, `commando`, `rpc`, `akairo`, `akairo-master` and `collection`',
  category: 'Core',
  utilisation: '{prefix}docs [query] <--src> <[source]>',
  cooldown: 5,
  nsfw: false,
  guildOnly: false,
  adminOnly: false,
  ownerOnly: false,
  permissions: [],
  clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
  string: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const query = args[0];
    if (!query) return message.reply(this.string[0]);
    let source;
    if(message.content.includes('--src')) {
      source = args[2];
      const url = `https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${encodeURIComponent(
        query
      )}`;
      axios.get(url).then(({ data }) => {
        if (data) {
          message.channel.send({ embed: data });
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
        }
      });
    }

  },
};
