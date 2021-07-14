const { MessageAttachment, Message } = require("discord.js"),
AmeClient = require('amethyste-api'),
Client = require("../../../struct/Client");

module.exports = {
    name: 'batslap',
    aliases: ['bs'],
    description: 'Slap a user with the power of batman',
    category: 'misc',
    utilisation: '{prefix}batslap',
    cooldown: 5,
    guildOnly: false,
    adminOnly: false,
    ownerOnly: false,
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
        let m = await  message.channel.send(message.guild.i18n.__mf("common.wait"));
        const buffer =  await AmeAPI.generate("batslap", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }), avatar: message.author.displayAvatarURL({ format: "png", size: 2048 })});
        const attachment = new MessageAttachment(buffer, "batslap.png");
        m.delete({ timeout: 3000 });
        message.channel.send(attachment);
      }
    },
};