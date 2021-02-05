const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'respect',
  aliases: [ 'f', 'rp', '+rp' ],
  group: 'Misc',
  description: 'Show thy respect. Accepts arguments.',
  async execute(client, message, args) {

    const rep = await message.channel.send(
      new MessageEmbed()
      .setColor('GREY')
      .setFooter(`Press F to pay respect | \©️${new Date().getFullYear()} Kiwii`)
      .setDescription(`${message.member} has paid their respect${args.length ? ` to ${args.join(' ')}.` : ''}`)
    );

    await message.delete().catch(() => null);

    return rep.react("🇫")
  }
};