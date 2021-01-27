module.exports = {
    name: 'kick',
    aliases: [],
    description: 'Kick a person',
    category: 'Core',
    utilisation: '{prefix}kick <mention>',
    execute(client, message, args) {

        if (!message.member.hasPermission("ADMINISTRATOR")) return;

        let mention = message.mentions.members.first();

        if (mention == undefined) {
            message.reply("Erreur : mention du membre incomplète ou inexacte.");
        }
        else {
            if (mention.kickable) {
                mention.kick();
                message.channel.send(mention.displayName + " a été(e) kické(e) avec succès !");
            }
            else {
                message.reply(" Impossible de kicker ce membre.");
            }
        }
    },
};
