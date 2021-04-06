const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    aliases: [],
    description: 'Invite the bot on the server',
    category: 'Core',
    utilisation: '{prefix}invite',
    cooldown: 10,
    nsfw: false,
    ownerOnly: false,
    adminOnly: false,
    guildOnly: false,
    permissions: [],
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    string: [],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        const invitesGuild = await message.guild.fetchInvites().then(g => {
            if(!g.size){
                return { url: this.string[0] }
            } else {
                g.first();
                return { url: g.first() }
            }
        }).catch((e) => { return {} });
        return message.channel.send({
            embed: {
                color: "BLUE",
                author: { name: client.user.username, icon_url: client.user.displayAvatarURL({ dynamic: true, size: 512, format: "png" })},
                title: this.string[4],
                fields: [
                   { name: "\u200b", value: [ `[${this.string[1]}](https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=0&scope=bot)`, `${this.string[2]}`].join("\n"), inline: true },
                   { name: "\u200b", value: [ `[${this.string[3]}](https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=1342696567&scope=bot)`, this.string[5]], inline: true },
                   { name: "\u200b", value: [ `[${this.string[6]}](https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=8&scope=bot)` , this.string[7]], inline: true },
                   { name: "\u200b", value: [ `[${this.string[8]}](https://discord.com/api/oauth2/authorize?client_id=776825747897319424&permissions=519249&scope=bot)`, this.string[9] ], inline: true, },
                   { name: "\u200b", value: [ `[${this.string[10]}](https://discord.com/oauth2/authorize?client_id=776825747897319424&permissions=1614138432&scope=bot)`, this.string[11]], inline: true },
                   { name: "\u200b", value: "\u200b", inline: true },
                   { name: `\u200b\n${this.string[12]}`, value: invitesGuild.url || this.string[13], inline: true }
                ],
                thumbnail: "https://cdn.discordapp.com/avatars/823158943214862357/7b9c263a86aebaf3ee5842115ef569dd.png?size=2048",
            },
        });
    },
};