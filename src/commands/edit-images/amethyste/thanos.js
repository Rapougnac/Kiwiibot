const { MessageAttachment, Message } = require("discord.js"),
AmeClient = require('amethyste-api'),
Client = require("../../../struct/Client");

module.exports = {
    name: 'thanos',
    aliases: [],
    description: '',
    category: 'misc',
    utilisation: '{prefix}thanos <member>',
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
          let m =  await message.channel.send(message.guild.i18n.__mf("common.wait"));
          const buffer = await  AmeAPI.generate("thanos", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
          const attachment = new MessageAttachment(buffer, "thanos.png");
          m.delete({ timeout: 3000 });
          message.channel.send(attachment);
        }
    },
};
