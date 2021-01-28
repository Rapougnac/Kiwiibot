const Discord = require("discord.js");
module.exports = {
    name: 'hackban',
    aliases: [],
    description: 'Ban a person',
    category: 'Core',
    utilisation: '{prefix}hackban <mention> <raison>',
    async execute(client, message, args) {

        if (!message.member.hasPermission("BAN_MEMBERS")) {

            return message.channel.send("Quelque chose c'est mal passé tu as besoin de la permission : (BAN_MEMBERS)");

        }
        //const args = message.content.trim().split(/ +/g);

        let userID = args[1];

        let reason = args.slice(2).join(" ");


        if (!userID) return message.channel.send("Merci de rentrer une id valide");

        if (isNaN(userID)) return message.channel.send("L'id doit être un nombre");

        if (userID === message.author.id) return message.channel.send("Vous ne pouvez pas vous bannir vous même.");

        if (userID === client.user.id) return message.channel.send("Tu ne peux pas me bannir.. en plus pourquoi le ferais-tu ?");


        if (!reason) reason = "No reason provided";


        client.users.fetch(userID).then(async user => {

            await message.guild.members.ban(user.id, { reason: reason });

            return message.channel.send(`**${user.tag}** a été banni du serveur.`);

        }).catch(error => {
            return message.channel.send(`Une erreur est survenue: **${error}**`);
        });
    },
};
