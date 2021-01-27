const Discord = require("discord.js");
module.exports = {
    name: 'help2',
    aliases: ['h2'],
    category: 'Core',
    utilisation: '{prefix}help2 <command name>',

    execute(client, message, args) {
        const embed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Commandes disponibles pour le moment :")
            .setFooter("Kiwii est un bot créé et maintenu par Rapougnac#0304")
            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/0/09/Wiki_tan_help_me.png")
            .addField(`${prefix}u are the best`, "reply: no u :3")
            .addField(`${prefix}avatar`, "reply the user's avatar")
            .addField(`${prefix}commands`, "reply the commands module")
            .addField(`${prefix}commandsnsfw`, 'reply the nsfw commands module')
            .addField(`${prefix}xp`, "show the current user's xp")
            .addField(`${prefix}adcmds`, "reply the admin commands module")
            .addField(`${prefix}infobot`, 'show the bot infos')
            .addField(`${prefix}sexyrate`, 'shows how you\'re sexy')
            .addField(`${prefix}8ball`, 'allows you to make decisive choices')
            .addField(`${prefix}poll`, 'allow you to create a survey EX : m?poll <question> | answer A |answer B | ect ONLY WORK FOR MODS, ADMINS AND THE OWNER')
            .addField(`${prefix}trigger`, 'Trigger yourself :)')
            .addField(`${prefix}changemymind`, 'C H A N G E  Y O U R  M I N D   EX : m?changemymind <put your sentence here>')
            .addField(`${prefix}owofy`, 'Returns a owofied version of your text')
            .addField(`${prefix}cattext`, 'Returns a cattext emoji')
            .addField(`${prefix}fact`, 'Returns a random fact')
            .addField(`${prefix}spoiler`, 'Returns a message with a unique spoiler for ever text letter')
            .addField(`${prefix}why`, 'Returns a random question')
            .addField(`${prefix}serverinfo`, 'Show the server info')
            .addField(`${prefix}userinfo`, 'Show a mentionned user infos (if no mention provided it\'ll be your profile')
            .addField(`${prefix}roleinfo`, 'Infos about a role')
            .addField(`${prefix}meme`, 'Send some memes found in r/meme, r/dankmeme, r/memes')
        message.channel.send(embed);

    },
};
