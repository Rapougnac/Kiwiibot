const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emojilist',
    aliases: ["emojis"],
    description: 'Display all the emojis of the guild',
    category: 'Misc',
    utilisation: '{prefix}emojilist',
    cooldown: 5,
    nsfw: false,
    ownerOnly: false,
    adminOnly: false,
    guildOnly: false,
    permissions: [],
    clientPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;

        message.guild.emojis.cache.forEach(emoji => {
            OverallEmojis++;
            if (emoji.animated) {
                Animated++;
                EmojisAnimated += Emoji(emoji.id, client)
            } else {
                EmojiCount++;
                Emojis += Emoji(emoji.id, client)
            }
        })
        let emn = new MessageEmbed()
        emn.setTitle(`Emojis of [${message.guild.name}] server`)
        emn.setThumbnail(message.guild.iconURL({ dynamic: true, format: 'png', size: 512 }))
        emn.setDescription(`**All emojis [${OverallEmojis}]**\n**Animated [${Animated}]:**${EmojisAnimated}\n**Standard [${EmojiCount}]:**${Emojis}`)
        emn.setColor(0x2f3136)
        message.channel.send(emn);
    },
};
function Emoji(id, client) {
    return client.emojis.cache.get(id).toString()
}