const { Client, Message, MessageEmbed } = require('discord.js');
const { clean } = require('../../util/string');
const util = require('util')
module.exports = {
  name: 'eeval',
  aliases: [],
  description: 'Eval the code',
  category: 'core',
  utilisation: '{prefix}eval',
  cooldown: 5,
  nsfw: false,
  ownerOnly: true,
  adminOnly: false,
  guildOnly: false,
  permissions: [],
  clientPermissions: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message) {
    const args = message.content.slice(client.prefix.length + this.name.length).trim().split(/ +/g);
    try {
      const code = args.join(' ');
      let result = eval(code);
      if (typeof result !== 'string') result = util.inspect(result);
      message.channel.send(clean(result), { code: 'js', split: true });
    } catch (e) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(e)}\n\`\`\``);
    }
    
  },
};
