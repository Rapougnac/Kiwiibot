const { Client, Message } = require("discord.js");
//const muteSchema = require("")

module.exports = {
    name: 'mute',
    aliases: [],
    description: 'Mute a person',
    category: 'Core',
    utilisation: '{prefix}mute <mention>',
    cooldown: 1,
    adminOnly: false,
    ownerOnly: false,
    guildOnly: true,
    nsfw: false,
    permissions: ["KICK_MEMBERS"],
    clientPermissions: ["KICK_MEMBERS", "MANAGE_ROLES", "SEND_MESSAGES", "VIEW_CHANNEL"],
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns client message args
     */
    async execute(client, message, args) {
        
        let mention = message.mentions.members.first();
        let reason = args.join(' ').slice(mention);

        if (mention == undefined) {
            message.reply("Erreur : mention du membre incomplète ou inexacte.");
        }
        else {
            mention.roles.add("773948291091922955");
            mention.roles.remove("714160630264889436");
            message.channel.send(mention.displayName + ` a été(e) mute avec succès ! Pour raison ${reason}`);
        }
    },
};
