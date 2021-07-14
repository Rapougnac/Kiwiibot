
const Command = require('../../struct/Command');
module.exports = class BallCommand extends Command {
  constructor(client) {
    super(client, {
      name: '8ball',
      aliases: [],
      description: 'Ping!',
      category: 'infos',
      cooldown: 10,
      utilisation: '{prefix}ping',
      string: [],
      adminOnly: false,
    });
  }
  /**
   * 
   * @param {Client} client 
   * @param {*} message 
   */
  async execute(client, message, args) {
    const question = args.join(' ');
    if (!question) return message.channel.send(this.config.string[0]);

    const replies = message.guild.i18n.__mf("8ball.questions").split("\n");
    //const replies = this.config.string[1]

    message.inlineReply(replies[Math.floor(Math.random() * replies.length)], {
        allowedMentions: {
            repliedUser: false,
        }
    });
  }
};
