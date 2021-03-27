const Discord = require("discord.js");
const AmeClient = require('amethyste-api');
const config = require('../../config.json');

module.exports = {
    name: 'house',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}house',
    async execute(client, message, args) {
        const AmeAPI = new AmeClient(config.amethyste.client); {
            const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member;
            const zz = await User.user.fetchFlags()
            .then(flags => Promise.resolve(Object.entries(flags.serialize()).filter(([_, val]) => !!val)))
            .then(flags => flags.map(([key, _]) => key))
            .catch(() => []);
            if(!zz[0]) return message.channel.send("You need to have a house!");
            const house = zz[0].replace('HOUSE_', "")
            let nameHouseAPI = house.slice(0, 1) + house.slice(1).toLowerCase()
            let m = await message.channel.send("**Please Wait...**");
            const buffer = await AmeAPI.generate("discordhouse", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }), house: nameHouseAPI});
            const attachment = new Discord.MessageAttachment(buffer, "discordhouse.png");
            m.delete({ timeout: 5000 });
            message.channel.send(attachment);
        }
    },
};