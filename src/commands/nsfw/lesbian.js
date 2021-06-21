
// const Discord = require('discord.js');

// module.exports = {
//   name: 'lesbian',
//   aliases: [],
//   description: '',
//   category: 'nsfw',
//   utilisation: '{prefix}lesbian',
//   async execute(client, message, args) {
//     if (message.channel.nsfw) {
//       const GIF = await neko.nsfw.lesbian();
//       const embed = new Discord.MessageEmbed()
//         .setColor('#202225')
//         .setTitle(`${message.author.tag} here's a random lesbian image/gif`)
//         .setImage(GIF.url);
//       message.channel.send(embed);
//     } else {
//       let m = await message.channel.send(
//         '**Warning** this command cannot be used in non-nsfw channels!'
//       );
//       m.delete({ timeout: 10000 });
//     }
//   },
// };
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
module.exports = class LesbianCommand extends Command {
   /** 
    *@param {Client} client 
    */ 
  constructor(client) {
    super(client, {
      name: 'lesbian',
      aliases: [],
      description: 'Get a random lesbian pic',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}lesbian',
      nsfw: true,
      clientPermissions: ['EMBED_LINKS']
    });
  }
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {
    const GIF = await neko.nsfw.lesbian();
      const embed = new MessageEmbed()
        .setColor('#202225')
        .setAuthor(`${message.author.tag} here's a random lesbian image/gif`, message.author.displayAvatarURL({ size: 512, format: 'png', dynamic: true }))
        .setImage(GIF.url);
      message.channel.send(embed);
  }
};