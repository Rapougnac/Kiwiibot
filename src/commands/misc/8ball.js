const { MessageEmbed } = require('discord.js');

module.exports = {
  name: '8ball',
  aliases: [],
  description: '',
  category: 'misc',
  utilisation: '{prefix}8ball',
  cooldown: 10,
  nsfw: false,
  guildOnly: false,
  adminOnly: false,
  ownerOnly: false,
  permissions: [],
  clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
  string: [],
  async execute(client, message, args) {
    const question = args.join(' ');
    if (!question) return message.channel.send(this.string[0]);

    const replies = this.string[1]

    message.inlineReply(replies[Math.floor(Math.random() * replies.length)], {
        allowedMentions: {
            repliedUser: false,
        }
    });
  },
};
