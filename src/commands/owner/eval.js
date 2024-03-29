const { clean } = require('../../util/string');
const util = require('util');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');

const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class EvalCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'eval',
      aliases: ['evl'],
      description: 'Execute some javascript code',
      category: 'owner',
      cooldown: 5,
      utilisation: '{prefix}eval [code]',
      ownerOnly: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message) {
    const args = message.content
      .slice(client.prefix.length + this.help.name.length)
      .trim()
      .split(/ +/g);
    try {
      const code = args.join(' ');
      let result = eval(code);
      if (typeof result !== 'string') result = util.inspect(result);
      message.channel.send(clean(result), { code: 'js', split: true });
    } catch (e) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(e)}\n\`\`\``);
    }
  }
};
