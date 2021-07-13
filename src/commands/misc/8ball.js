// const { MessageEmbed } = require('discord.js');

// module.exports = {
//   name: '8ball',
//   aliases: [],
//   description: '',
//   category: 'misc',
//   utilisation: '{prefix}8ball',
//   cooldown: 10,
//   nsfw: false,
//   guildOnly: false,
//   adminOnly: false,
//   ownerOnly: false,
//   permissions: [],
//   clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
//   string: [],
//   async execute(client, message, args) {
//     const question = args.join(' ');
//     if (!question) return message.channel.send(this.config.string[0]);

//     const replies = this.config.string[1]

//     message.inlineReply(replies[Math.floor(Math.random() * replies.length)], {
//         allowedMentions: {
//             repliedUser: false,
//         }
//     });
//   },
// };
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class EightBallCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: '8ball',
      aliases: ['8-ball', 'ball', 'eight-ball'],
      description: 'Let the random du your work',
      category: 'misc',
      cooldown: 5,
      utilisation: '{prefix}8ball [question]',
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const question = args.join(' ');
    if (!question) return message.channel.send(this.config.string[0]);

    const replies = this.config.string[1];

    message.inlineReply(replies[Math.floor(Math.random() * replies.length)], {
      allowedMentions: {
        repliedUser: false,
      },
    });
  }
};
