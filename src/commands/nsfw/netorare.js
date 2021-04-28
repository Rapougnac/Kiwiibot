const akaneko = require('akaneko');
const Discord = require('discord.js');

module.exports = {
  name: 'netorare',
  aliases: [],
  description: '',
  category: 'Nsfw',
  utilisation: '{prefix}netorare',
  async execute(client, message, args) {
    if (message.channel.nsfw) {
      const emebed = new Discord.MessageEmbed()
        .setTitle(
          `${message.author.tag} here some netorare (Wow, I won't even question your fetishes.)`
        )
        .setImage(await akaneko.nsfw.netorare());
      message.channel.send(emebed);
    } else {
      let m = await message.channel.send(
        '**Warning** this command cannot be used in non-nsfw channels!'
      );
      m.delete({ timeout: 10000 });
    }
  },
};
