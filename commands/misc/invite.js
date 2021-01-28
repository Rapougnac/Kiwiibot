const Discord = require("discord.js");
module.exports = {
    name: 'invite',
    aliases: [],
    description: 'Invitation link',
    category: 'Misc',
    utilisation: '{prefix}invite',
    async execute(client, message, args) {
        //const args = message.content.slice(prefix.length + (4)).trim().split(/ +/g);
        if (message.content.startsWith(prefix + 'invite')) {
            var inviteEmbed = new Discord.MessageEmbed()
                .setURL("https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=0&scope=bot")
                .setTitle(`Invite link of Kiwii`)
                .setColor(0x111111)
                .setThumbnail('https://cdn.discordapp.com/attachments/772106096713924671/795269602912632852/anime-original-brown-hair-girl-green-eyes-hd-wallpaper-preview.png')
            message.channel.send(inviteEmbed);
        }
    },
};
