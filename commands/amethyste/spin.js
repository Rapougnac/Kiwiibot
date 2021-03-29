const { MessageAttachment, Message, Client } = require("discord.js")
const AmeClient = require('amethyste-api');
const config = require('../../config.json');

module.exports = {
    name: 'spin',
    aliases: ["sp"],
    description: 'Spin someone',
    category: 'Misc',
    utilisation: '{prefix}spin <user>',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        const AmeAPI = new AmeClient(config.amethyste.client); {
    
          const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member; 
          let m = await  message.channel.send("**Please Wait...**");
            const buffer =  await AmeAPI.generate("spin", { url: message.author.displayAvatarURL({ format: "png", size: 2048 }), avatar: User.user.displayAvatarURL({ format: "png", size: 2048 })});
          const attachment = new MessageAttachment(buffer, "spin.png");
          m.delete({ timeout: 5000 });
          message.channel.send(attachment);
        }
    },
};