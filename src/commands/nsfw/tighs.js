const akaneko = require('akaneko');
const Discord = require('discord.js');

module.exports = {
  name: 'tighs',
  aliases: [],
  description: '',
  category: 'Nsfw',
  utilisation: '{prefix}tighs',
  async execute(client, message, args) {
    if (message.channel.nsfw) {
      const emebed = new Discord.MessageEmbed()
        .setTitle(`${message.author.tag} here some tighs (this is great)`)
        .setImage(await akaneko.nsfw.thighs());
      message.channel.send(emebed);
    } else {
      let m = await message.channel.send(
        '**Warning** this command cannot be used in non-nsfw channels!'
      );
      m.delete({ timeout: 10000 });
    }
  },
};
