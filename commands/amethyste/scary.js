const { Message, Client, MessageAttachment } = require("discord.js"),
AmeClient = require('amethyste-api');

module.exports = {
    name: 'scary',
    aliases: [],
    description: 'Scare the little girl by your beautiful profile picture',
    category: 'Misc',
    utilisation: '{prefix}scary <member>',
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
        const AmeAPI = new AmeClient(client.config.amethyste.client); {
            const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member;
            let m = await message.channel.send("**Please Wait...**");
            const buffer = await AmeAPI.generate("scary", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
            const attachment = new MessageAttachment(buffer, "scary.png");
            m.delete({ timeout: 5000 });
            message.channel.send(attachment);
        }
    },
};
