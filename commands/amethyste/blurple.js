const Discord = require("discord.js");
const AmeClient = require('amethyste-api');
const config = require('../../config.json');

module.exports = {
    name: 'blurple',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}blurple',
    async execute(client, message, args) {
        const AmeAPI = new AmeClient(config.amethyste.client); {

            //const args = message.content.trim().split(/ +/g);
            const User = await  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
              || message.member; 
            let m = await message.channel.send("**Please Wait...**");
            const buffer = await AmeAPI.generate("blurple", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
            const attachment = new Discord.MessageAttachment(buffer, "blurple.png");
            m.delete({ timeout: 5000 });
            message.channel.send(attachment);
          }
    },
};
