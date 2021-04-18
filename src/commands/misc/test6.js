const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const api = require("blueapi.js")
module.exports = {
    name: 'aa',
    aliases: ["bb"],
    description: '',
    category: '',
    utilisation: '{prefix}',
    cooldown: 5,
    nsfw: false,
    ownerOnly: false,
    adminOnly: false,
    guildOnly: false,
    permissions: [],
    clientPermissions: [],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        let truc = api.image.ad(message.author.displayAvatarURL({ dynamic: false, format: 'png',  }))
        const babababbab = new MessageAttachment(truc, "machin.gif");
        message.channel.send(babababbab)
    },
};