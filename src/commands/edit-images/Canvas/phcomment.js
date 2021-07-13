const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../../struct/Command');
const Client = require('../../../struct/Client');
const fetch = require('node-fetch');
module.exports = class PHCommentCommand extends Command {
   /** 
    *@param {Client} client 
    */ 
  constructor(client) {
    super(client, {
      name: 'phcomment',
      aliases: ['commentph', 'ph'],
      description: 'Write a comment in ph ( ͡• ͜ʖ ͡• )',
      category: 'edit-images',
      cooldown: 5,
      utilisation: '{prefix}phcomment <user> [text]',
      clientPermissions: ['EMBED_LINKS'],
    });
  }
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {
    const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().startsWith(args[0].toLowerCase())) || message.guild.members.cache.find(r => r.displayName.toLowerCase().startsWith(args[0].toLowerCase()));
        if(User){
            const query = args.slice(1).join(' ');
            const data = await fetch(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${User.user.displayAvatarURL()}&text=${encodeURIComponent(query)}&username=${encodeURIComponent(User.user.username)}`).then((res) => res.json())
            const att = new MessageAttachment(data.message)
            message.channel.send(att);
        } else {
            const query = args.join(' ');
            const data = await fetch(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${message.author.displayAvatarURL()}&text=${encodeURIComponent(query)}&username=${encodeURIComponent(message.author.username)}`).then((res) => res.json());
            const att = new MessageAttachment(data.message)
            message.channel.send(att);
        }
  }
};