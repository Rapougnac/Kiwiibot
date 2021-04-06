const { MessageEmbed, Client, Message } = require("discord.js");
const { language } = require("../../language");
module.exports = {
    name: 'hackban',
    aliases: ['hb'],
    description: 'hackban somebody',
    category: 'Core',
    utilisation: '{prefix}hackban [id] <reason>',
    ownerOnly: false,
    guildOnly: true,
    adminOnly: false,
    permissions: ["BAN_MEMBERS"],
    clientPermissions: ["BAN_MEMBERS"],
    string: [],
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        let userID = args[0];

        let reason = args.slice(1).join(" ");


        if (!userID) return message.channel.send(this.string[0]);

        if (isNaN(userID)) return message.channel.send(this.string[1]);

        if (userID === message.author.id) return message.channel.send(this.string[2]);

        if (userID === client.user.id) return message.channel.send(this.string[3]);


        if (!reason) reason = "No reason provided";


        client.users.fetch(userID).then(async user => {
            await message.guild.members.ban(user.id, { reason: reason });

            return message.channel.send(this.string[4].format(user.tag));

        }).catch(error => {
            return message.channel.send(this.string[5].format(error));
        });

    },
};
