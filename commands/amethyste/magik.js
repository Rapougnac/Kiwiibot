const { MessageAttachment, Client, Message } = require("discord.js"),
AmeClient = require('amethyste-api');

module.exports = {
    name: 'magik',
    aliases: [],
    description: 'You\'ll be magik',
    category: 'Misc',
    utilisation: '{prefix}magik',
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
          const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member; 
          let m = await message.channel.send(this.string[0]);
          const buffer = await AmeAPI.generate("magik", { url: User.user.displayAvatarURL({ format: "png", size: 2048 })});
          const attachment = new MessageAttachment(buffer, "magik.png");
          m.delete({ timeout: 3000 });
          message.channel.send(attachment);
        }
    },
};