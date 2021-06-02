module.exports = {
    name: 'tempmute',
    aliases: [],
    description: 'Tempmute a person',
    category: 'moderation',
    utilisation: '{prefix}tempmute <mention>',
    async execute(client, message, args) {

        if (!message.member.hasPermission("ADMINISTRATOR")) return;

        let mention = message.mentions.members.first();

        if (mention == undefined) {
          message.reply("Erreur : mention du membre incomplète ou inexacte.")
        }
        else {
          let args = message.content.split(" ");

          mention.roles.add("773948291091922955");
          mention.roles.remove("714160630264889436");
          setTimeout(function () {
            mention.roles.remove("773948291091922955");
            mention.roles.add("714160630264889436");
            message.channel.send("<@" + mention.id + "> tu est libéré(e) de tes chaînes à toi la liberté de flood le serveur ! ");
          }, args[2] * 1000);
        }
    },
};
