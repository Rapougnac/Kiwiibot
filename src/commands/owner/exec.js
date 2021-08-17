const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const { exec } = require('child_process');
module.exports = class ExecCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'exec',
      aliases: ['execute'],
      description: 'Execute commands in shell',
      category: 'owner',
      cooldown: 5,
      utilisation: '{prefix}exec [cmd]',
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const cmd = args.join(' ');
    if (!cmd)
      return message.inlineReply("You didn't provide any command!", {
        allowedMentions: {
          repliedUser: false,
        },
      });
    try {
      exec(cmd, (err, stdout) => {
        let res = stdout || err;
        message.channel.send(res, { split: true, code: 'js' });
      });
    } catch (e) {
      message.channel.send(`\`ERROR\`\n\`\`\`xl\n${e}\n\`\`\``);
    }
  }
};
