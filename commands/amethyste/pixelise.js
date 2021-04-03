
const AmeClient = require('amethyste-api');
const { MessageAttachment, Message, Client } = require("discord.js")

module.exports = {
  name: 'pixelize',
  aliases: [],
  description: '',
  category: 'Misc',
  utilisation: '{prefix}pixelize',
  cooldown: 5,
  guildOnly: false,
  ownerOnly: false,
  adminOnly: false,
  nsfw: false,
  permissions: [],
  clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES"],
  string: [],
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {
    const AmeAPI = new AmeClient(client.config.amethyste.client); {

      const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase());
      if (User) {
        const number = parseInt(args[1])
        if (isNaN(number)) return message.channel.send(this.string[1]);
        if (number < 1) return message.channel.send(this.string[2]);
        if (number > 50) return message.channel.send(this.string[2]);
        let m = await message.channel.send(this.string[0]);
        const buffer = await AmeAPI.generate("pixelize", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }), pixelize: number });
        const attachment = new MessageAttachment(buffer, "pixelize.png");
        m.delete({ timeout: 3000 });
        message.channel.send(attachment);
      } else {
        const number = parseInt(args[0])
        if (isNaN(number)) return message.channel.send(this.string[1]);
        if (number < 1) return message.channel.send(this.string[2]);
        if (number > 50) return message.channel.send(this.string[2]);
        let m = await message.channel.send(this.string[0]);
        const buffer = await AmeAPI.generate("pixelize", { url: message.author.displayAvatarURL({ format: "png", size: 2048 }), pixelize: number });
        const attachment = new MessageAttachment(buffer, "pixelize.png");
        m.delete({ timeout: 3000 });
        message.channel.send(attachment);
      }
    }
  },
};
