const { MessageAttachment, Message, Client } = require("discord.js")
const AmeClient = require('amethyste-api');
const config = require('../../config.json');

module.exports = {
    name: 'vs',
    aliases: ["versus"],
    description: 'An epic combat against your opponent, or you if you have no friends',
    category: 'Misc',
    utilisation: '{prefix}vs [user]',
    cooldown: 5,
    guildOnly: false,
    ownerOnly: false,
    adminOnly: false,
    nsfw: false,
    permissions: [],
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        const AmeAPI = new AmeClient(config.amethyste.client); {
    
          const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member; 
          let m = await  message.channel.send("**Please Wait...**");
            const buffer =  await AmeAPI.generate("vs", { url: message.author.displayAvatarURL({ format: "png", size: 2048 }), avatar: User.user.displayAvatarURL({ format: "png", size: 2048 })});
          const attachment = new MessageAttachment(buffer, "vs.png");
          m.delete({ timeout: 5000 });
          message.channel.send(attachment);
        }
    },
};