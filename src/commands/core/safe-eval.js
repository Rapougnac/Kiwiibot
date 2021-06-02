const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const safeEval = require('safe-eval');
const { clean } = require('../../util/string');
const util = require('util');
module.exports = {
  name: 'eval',
  aliases: [],
  description: '',
  category: 'core',
  utilisation: '{prefix}eval',
  cooldown: 5,
  nsfw: false,
  ownerOnly: false,
  adminOnly: false,
  guildOnly: false,
  permissions: [],
  clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', ''],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message) {
    try {
      const args = message.content
        .slice(client.prefix.length + this.name.length)
        .trim()
        .split(/ +/g);
      const code = args.join(' ');
      if(code.startsWith('console.log(')) {
        message.channel.send(clean(util.inspect(console.log())), { code: 'js', split: true });
      }
      let res = safeEval(code);
      if (typeof res !== 'string') res = util.inspect(res);
      message.channel.send(clean(res), { code: 'js', split: true });
    } catch (e) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(e.stack)}\n\`\`\``);
    }
  },
};
