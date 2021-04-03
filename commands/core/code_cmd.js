const fs = require("fs");
const glob = require('glob');
const { Message, Client } = require("discord.js");
module.exports = {
    name: "code",
    aliases: [],
    description: "Display the code of the specified command.",
    category: "Core",
    ownerOnly: true,
    amdinOnly: false,
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
            code = fs.readFileSync(client.commands_path.get(args[0]), "utf-8");
            const options = {
                method: "POST",
                body: code,
                headers: {
                    "Content-Type": "application/json",
                },
            };
            message.channel.send(`Here is the code for the ${args[0]} command:\n\`\`\`js\n${code.substr(0, 1900)}\`\`\``);

        } catch (error) {
            return message.channel.send(`I couldn't find a command called \`${args[0]}\`` + error);
        };

    },
};