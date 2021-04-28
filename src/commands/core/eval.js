const { Client, Message, MessageEmbed } = require('discord.js');
const { clean } = require("../../util/string")
module.exports = {
    name: 'eval',
    aliases: [],
    description: 'Eval the code',
    category: 'Core',
    utilisation: '{prefix}eval',
    cooldown: 5,
    nsfw: false,
    ownerOnly: true,
    adminOnly: false,
    guildOnly: false,
    permissions: [],
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        try {
            const code = args.join(" ");
            let result = eval(code);
            if (typeof result !== "string")
            result = require("util").inspect(result);
            message.channel.send(clean(result), { code:"js", split: true });
        } catch (e) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(e)}\n\`\`\``);
        }
    },
};

