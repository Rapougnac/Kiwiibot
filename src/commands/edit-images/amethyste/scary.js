const { Message, MessageAttachment } = require("discord.js"),
AmeClient = require('amethyste-api'),
Client = require("../../../struct/Client");

module.exports = {
    name: 'scary',
    aliases: [],
    description: 'Scare the little girl by your beautiful profile picture',
    category: 'misc',
    utilisation: '{prefix}scary <member>',
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
            const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().startsWith(args.join(' ').toLowerCase())) || message.guild.members.cache.find(r => r.displayName.toLowerCase().startsWith(args.join(' ').toLowerCase())) || message.member;
            let m = await message.channel.send(message.guild.i18n.__mf("common.wait"));
            const buffer = await AmeAPI.generate("scary", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
            const attachment = new MessageAttachment(buffer, "scary.png");
            m.delete({ timeout: 3000 });
            message.channel.send(attachment);
        }
    },
};
