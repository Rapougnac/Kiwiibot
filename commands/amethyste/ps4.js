const Discord = require("discord.js");
const AmeClient = require('amethyste-api');

module.exports = {
    name: 'ps4',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}ps4',
    async execute(client, message, args) {
        const AmeAPI = new AmeClient('666703a31e32bb7b294a531293711476c207b7b9949aa1cc5c8892fc2475dfb8f521d832e47974d4f7c0e83bebaaadc3ad351c3e1ec8837fab4b3cecccf0b139'); {

            //const args = message.content.trim().split(/ +/g);
            const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member;;
            let m = await message.channel.send("**Please Wait...**");
            const buffer = await AmeAPI.generate("ps4", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
            const attachment = new Discord.MessageAttachment(buffer, "ps4.png");
            m.delete({ timeout: 5000 });
            message.channel.send(attachment);
        }
    },
};
