module.exports = {
    name: 'mute',
    aliases: ['p'],
    description: 'Mute a person',
    category: 'Core',
    utilisation: '{prefix}mute',
    execute(client, message, args) {
        let mention = message.mentions.members.first();

        if (mention == undefined) {
            message.reply("Erreur : mention du membre incomplète ou inexacte.");
        }
        else {
            mention.roles.add("773948291091922955");
            mention.roles.remove("714160630264889436");
            message.reply(mention.displayName + " a été(e) mute avec succès !");
        }
    },
};
