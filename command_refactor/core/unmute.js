module.exports = {
    name: 'unmute',
    aliases: ['p'],
    description: 'Unmute a person',
    category: 'Core',
    utilisation: '{prefix}unmute',
    execute(client, message, args) {
        let mention = message.mentions.members.first();

        if (mention == undefined) {
            message.reply("Erreur : mention du membre incomplète ou inexacte.");
        }
        else {
            mention.roles.remove("773948291091922955");
            mention.roles.add("714160630264889436");
            message.reply(mention.displayName + " a été(e) unmute avec succès !");
        }
    },
};
