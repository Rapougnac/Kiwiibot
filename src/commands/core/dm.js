const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'dm',
    aliases: ["mp"],
    description: 'Dm a specific user who\'s in the guild',
    category: 'Core',
    utilisation: '{prefix}dm',
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
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user;

        const str = args.slice(1).join(" ");
        if(!user) return message.channel.send(this.string[0]);
        try{
        if(message.content.includes("-a")){
            user.send(str.replace(/-a/g, ""));
        } else {
            user.send(`${message.author.tag}: ${str}`)
        }
        } catch (e) {
            message.channel.send("Erreur" + e)
        }
    },
};