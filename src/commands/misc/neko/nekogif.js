const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require('discord.js');

module.exports = {
  name: 'nekogif',
  aliases: [],
  description: '',
  category: 'misc',
  utilisation: '{prefix}nekogif',
  async execute(client, message, args) {
    const GIF = await neko.sfw.nekoGif();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random neko gif`)
      .setImage(GIF.url);
    message.channel.send(embed);
  },
};
