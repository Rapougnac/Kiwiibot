const { hangman } = require('reconlx');

module.exports = {
  name: 'hangman',
  aliases: ['hm'],
  description: 'A hangman game',
  category: 'Misc',
  utilisation: '{prefix}hm',
  async execute(client, message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES'))
      return message.channel.send(
        'Tu as besoin des permissions MANAGE_MESSAGES !'
      );
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!channel)
      return message.channel.send("S'il te plaît spécifie un channel !");
    const word = args.slice(1).join(' ');
    if (!word) return message.channel.send('Spécifie un mot a deviner !');

    const hang = new hangman({
      message: message,
      word: word,
      client: client,
      channelID: channel.id,
    });

    hang.start();
  },
};
