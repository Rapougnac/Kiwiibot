const Discord = require("discord.js");
const AmeClient = require('amethyste-api');
const config = require('../../../config.json');

module.exports = {
    name: 'approved',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}approved',
    execute(client, message, args) {
        const AmeAPI = new AmeClient(config.amethyste.client); {

            //const args = message.content.trim().split(/ +/g);
            const User =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
              || message.member; let m =  message.channel.send("**Please Wait...**");
            const buffer =  AmeAPI.generate("approved", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
            const attachment = new Discord.MessageAttachment(buffer, "approved.png");
            m.delete({ timeout: 5000 });
            message.channel.send(attachment);
          }
    },
};
