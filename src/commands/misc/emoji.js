const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emote',
    aliases: ["emoji"],
    description: 'Display the specified emoji',
    category: 'Misc',
    utilisation: '{prefix}emote',
    cooldown: 5,
    nsfw: false,
    ownerOnly: false,
    adminOnly: false,
    guildOnly: false,
    permissions: [],
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {

        if (!args[0] || !args[0].startsWith("<") || !args[0].endsWith(">") || !args[0].includes(":")) return message.channel.send(`Please Give A Valid Custom Emoji!`);

        let Thinger = args[0].split(":");

        let Animated;
        if (Thinger[0] === "<a") {
          Animated = true;
        } else {
          Animated = false;
        }

        const Name = Thinger[1];
        const ID = Thinger[2].slice(0, -1);
        const Link = `https://cdn.discordapp.com/emojis/${ID}.${Animated ? "gif" : "png"}?v=1;`

        const Embed = new MessageEmbed()
        .setColor(client.config.colors.base)
        .setThumbnail(Link)
        .setTitle(`Emoji Information!`)
        .addField(`Name`, Name, true)
        .addField(`ID`, ID, true)
        .addField(`Animated`, Animated ? "Yes" : "No", true)
        .addField(`Link`, `[Click Me](${Link})`)

        return message.channel.send(Embed);
    },
};