const prefixSchema = require('../../models/PrefixSchema')
const { confirmation } = require('@reconlx/discord.js')
const { Message, Client } = require("discord.js");
module.exports = {
    name : 'prefix-reset',
    aliases: ["pr", "clearprefix", "resetprefix"],
    category: "Core",
    utilisation: "{prefix}prefix-reset",
    description: "Reset the prefix",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        message.channel.send("Are you sure you want to reset the prefix?").then(async (msg) => {
            const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000)
            if(emoji === '✅') {
                msg.delete()
                await prefixSchema.findOneAndDelete({ GuildID: message.guild.id })
                message.channel.send(`The prefix has been resetted to ${client.config.discord.default_prefix}`)
            }
            if(emoji === '❌') {
                msg.delete()
                message.channel.send('reset prefix has been cancelled.')
            }
        })

    },
};