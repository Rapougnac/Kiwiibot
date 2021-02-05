const fs = require("fs");
const glob = require('glob');
var recursive_readdir = function (src, callback) {
    glob(src + '/**/*', callback);
};
module.exports = {
    name: "code",
    description: "Display the code of the specified command.",
    category: "Core",
    async execute(message, args) {

        const client = message.client;
        let code;
        try {
            code = recursive_readdir(`./commands/${args[0]}.js`).toString();
        } catch (error) {
            return message.channel.send(`I couldn't find a command called \`${args[0]}\`` + error);
        }

        try {
            if (args[0]) {
                const options = {
                    method: "POST",
                    body: code,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                message.channel.send(`Here is the code for the ${args[0]} command:\n\`\`\`js\n${code.substr(0, 1900)}\`\`\``);
            }
        } catch (e) {
            return message.channel.send(
                "There was an error displaying the command's code."
            );
        }
    },
};