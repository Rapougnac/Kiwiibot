const akaneko = require('akaneko');
const Discord = require('discord.js');

module.exports = {
  name: 'glasses',
  aliases: [],
  description: '',
  category: 'nsfw',
  utilisation: '{prefix}glasses',
  async execute(client, message, args) {
    if (message.channel.nsfw) {
      const emebed = new Discord.MessageEmbed()
        .setTitle(
          `${message.author.tag} here some glasses (I'm a bot but I'm horny...)`
        )
        .setImage(await akaneko.nsfw.glasses());
      message.channel.send(emebed);
    } else {
      let m = await message.channel.send(
        '**Warning** this command cannot be used in non-nsfw channels!'
      );
      m.delete({ timeout: 10000 });
    }
  },
};
