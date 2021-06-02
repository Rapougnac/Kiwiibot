const { MessageAttachment, Message } = require("discord.js"),
AmeClient = require('amethyste-api'),
Client = require("../../../struct/Client");

module.exports = {
    name: 'afusion',
    aliases: ['fusion'],
    description: 'fusionnate your profile picture with the specified member',
    category: 'misc',
    utilisation: '{prefix}afusion [member]',
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
          const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member;
          let m = await  message.channel.send(this.string[0]);
          const buffer =  await AmeAPI.generate("afusion", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }), avatar: message.author.displayAvatarURL({ format: "png", size: 2048 })});
          const attachment = new MessageAttachment(buffer, "afusion.png");
          m.delete({ timeout: 3000 });
          message.channel.send(attachment);
        }
    },
};