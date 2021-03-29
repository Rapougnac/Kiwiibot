const { MessageAttachment, Message, Client } = require("discord.js"),
AmeClient = require('amethyste-api');

module.exports = {
    name: 'batslap',
    aliases: ['bs'],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}batslap',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        const AmeAPI = new AmeClient(client.config.amethyste.client); {
    
          //const args = message.content.trim().split(/ +/g);
          const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member; 
          let m = await  message.channel.send("**Please Wait...**");
          const buffer =  await AmeAPI.generate("batslap", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }), avatar: message.author.displayAvatarURL({ format: "png", size: 2048 })});
          const attachment = new MessageAttachment(buffer, "batslap.png");
          m.delete({ timeout: 5000 });
          message.channel.send(attachment);
        }
    },
};