const { MessageAttachment, Message, Client } = require("discord.js"),
AmeClient = require('amethyste-api');

module.exports = {
    name: 'facebook',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}facebook',
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
            const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase());
            if(User){
            const text = args.slice(1).join(' ');
            let m = await message.channel.send("**Please Wait...**");
            const buffer = await AmeAPI.generate("facebook", { url: User.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }), text: text });
            const attachment = new MessageAttachment(buffer, "facebook.png");
            m.delete({ timeout: 5000 });
            message.channel.send(attachment);
            }else {
                const text = args.join(" ");
                let m = await message.channel.send("**Please Wait...**");
                const buffer = await AmeAPI.generate("facebook", { url: message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }), text: text });
                const attachment = new Discord.MessageAttachment(buffer, "facebook.png");
                m.delete({ timeout: 5000 });
                message.channel.send(attachment);
            }

        }
    },
};
