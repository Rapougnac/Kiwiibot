
const fetch = require('node-fetch');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'chatbot',
  aliases: ["chat"],
  description: 'Chat with the bot with the api \n⚠ This functionnality is made with an API son it can\'t be translated!',
  category: 'Core',
  utilisation: '{prefix}chatbot',
  cooldown: 5,
  nsfw: false,
  guildOnly: false,
  ownerOnly: false,
  adminOnly: false,
  permissions: [],
  clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
  string: [],
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {
    const input = args.join(" ");

    // Start typing
    message.channel.startTyping();

    // Get a response from the bot via api
    const res = await fetch(`http://api.brainshop.ai/get?bid=${client.config.chatbot.id}&key=${client.config.chatbot.key}&uid=${message.author.id}&msg=${encodeURIComponent(input)}`)
      .then(res => res.json())
      .catch(() => {});

    // Add a 3s delay
    await new Promise(_ => setTimeout(() => _(), 3000))

    // check if we get proper response
    if (typeof res.cnt !== 'string') {
      return message.channel.send('???', { replyTo: message })
        .then(() => {
          message.channel.stopTyping();
          return { success: true };
        })
        .catch(() => {
          message.channel.stopTyping();
          return { success: false };
        });
    };

    // send the response
    return message.channel.send(res.cnt, { replyTo: message })
      .then(() => {
        message.channel.stopTyping();
        return { success: true };
      })
      .catch(() => {
        message.channel.stopTyping();
        return { success: false };
      });

  },
};
