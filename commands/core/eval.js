const { Client, Message, MessageEmbed, DiscordAPIError } = require('discord.js');

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
    clientPermissions: [],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        // const { member } = message;
        // if(member.id === ownerID){
        try {
            const code = args.join(" ");
            let result = eval(code);
            if (typeof result !== "string")
            result = require("util").inspect(result);
            message.channel.send(clean(result), { code:"js", split: true });
        } catch (e) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(e)}\n\`\`\``);
        }
        // } else {
        //     message.channel.send("This command is only usable by my owner")
        // }
    },
};
const clean = text => {
    if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
    return text;
}

