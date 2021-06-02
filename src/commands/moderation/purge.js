const { Client, Message } = require("discord.js");
module.exports = {
    name: 'purge',
    aliases: [],
    description: '',
    category: 'moderation',
    utilisation: '{prefix}purge  <number of messages you want to delete',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        const amount = args.join(' ');
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            if (amount[0] == undefined) {
                message.reply("Nombre du message non ou mal défini.")
            }
            else {

                if (isNaN(amount)) {
                    message.reply("C'est pas un nombre ça -_-")
                }
                else {
                     await message.channel.bulkDelete(amount).then(messages => {
                        console.log(messages.size + " messages ont étés supprimmés !")
                    }).catch(err => {
                        console.log("Erreur lors du clear : " + err)
                        message.channel.send("Erreur lors du clear " + err)
                    });
                }
            }
        }
    }
};
