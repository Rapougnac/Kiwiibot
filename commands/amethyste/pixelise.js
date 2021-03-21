const Discord = require("discord.js");
const AmeClient = require('amethyste-api');
const config = require('../../config.json');

module.exports = {
    name: 'pixelize',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}pixelize',
    async execute(client, message, args) {
        const AmeAPI = new AmeClient(config.amethyste.client); {
    
          //const args = message.content.trim().split(/ +/g);
          const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member;
          let m =  await message.channel.send("**Please Wait...**");
          const buffer = await  AmeAPI.generate("pixelize", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }), pixelize: 50 });
          const attachment = new Discord.MessageAttachment(buffer, "pixelize.png");
          m.delete({ timeout: 5000 });
          message.channel.send(attachment);
        }
    },
};
