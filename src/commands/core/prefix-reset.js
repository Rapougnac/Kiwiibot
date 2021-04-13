const prefixSchema = require('../../models/PrefixSchema')
const { confirmation } = require('@reconlx/discord.js')
const { Message, Client } = require("discord.js");
module.exports = {
    name : 'prefix-reset',
    aliases: ["pr", "clearprefix", "resetprefix"],
    category: "Core",
    utilisation: "{prefix}prefix-reset",
    description: "Reset the prefix",
    cooldown: 5,
    nsfw: false,
    guildOnly: false,
    ownerOnly: false,
    adminOnly: true,
    permissions: [],
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
    string: [],
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        message.channel.send(this.string[0]).then(async (msg) => {
            const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000)
            if(emoji === '✅') {
                msg.delete()
                await prefixSchema.findOneAndDelete({ GuildID: message.guild.id })
                message.channel.send(this.string[1].format(client.config.discord.default_prefix))
            }
            if(emoji === '❌') {
                msg.delete()
                return message.channel.send(this.string[2])
            }
        })

    },
};