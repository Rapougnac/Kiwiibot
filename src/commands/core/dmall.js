const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'dmall',
    aliases: ["mpall"],
    description: 'Dm a specific user',
    category: 'Core',
    utilisation: '{prefix}dmall',
    cooldown: 5,
    nsfw: false,
    ownerOnly: true,
    adminOnly: false,
    guildOnly: false,
    permissions: [],
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
    string: [],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        client.users.fetch(args[0]).then(async user => {
            const str = args.slice(1).join(" ");
            if(!user) return message.channel.send(this.string[0]);
            if(message.content.includes("-a")){
                user.send(str.replace("-a", ""));
            } else {
                user.send(`${message.author.tag}: ${str}`)
            }
            console.log("Sended dm")
        }).catch(error => {
            console.error("[Error]", error);
        });
    },
};