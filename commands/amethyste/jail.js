const { Client, Message, MessageAttachment } = require("discord.js"),
AmeClient = require('amethyste-api');

module.exports = {
    name: 'jail',
    aliases: [],
    description: 'Go to horny jail!',
    category: 'Misc',
    utilisation: '{prefix}jail',
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
          const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member;
          let m = await  message.channel.send("**Please Wait...**");
          const buffer =  await AmeAPI.generate("jail", { url: User.user.displayAvatarURL({ format: "png", size: 2048 })});
          const attachment = new MessageAttachment(buffer, "jail.png");
          m.delete({ timeout: 5000 });
          message.channel.send(attachment);
        }
    },
};