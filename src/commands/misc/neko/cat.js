const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require('discord.js');

module.exports = {
  name: 'cat',
  aliases: [],
  description: '',
  category: 'neko',
  utilisation: '{prefix}cat',
  async execute(client, message, args) {
    const GIF = await neko.sfw.meow();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random cat image/gif`)
      .setImage(GIF.url);
    message.channel.send(embed);
  },
};
