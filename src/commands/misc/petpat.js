const api = require('blueapi.js');
const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'pet',
    aliases: ["petpat", "petpet"],
    description: 'Petpetpatpat',
    category: 'Misc',
    utilisation: '{prefix}pet',
    cooldown: 5,
    nsfw: false,
    ownerOnly: false,
    adminOnly: false,
    guildOnly: false,
    permissions: [],
    clientPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        // const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member;
        client.users.fetch(args[0]).then(async user => {
        let image = await api.image.petpet(user.displayAvatarURL({ dynamic: false, format: 'png' }), { frames: 15 } );

        const file = new MessageAttachment(image, "petpat.gif");

        message.channel.send(file);
        });
    },
};