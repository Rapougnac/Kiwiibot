module.exports = {
    name: 'mute',
    aliases: [],
    description: 'Mute a person',
    category: 'Core',
    utilisation: '{prefix}mute <mention>',
    execute(client, message, args) {
        
        if (!message.member.hasPermission("ADMINISTRATOR")) return;

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