const fs = require("fs");
const glob = require('glob');

module.exports = {
    name: "code",
    description: "Display the code of the specified command.",
    category: "Core",
    async execute(client, message, args) {

        let code;
        let files = client.list_cmd;
        files = files.filter(file => file.split('/').slice(-1)==`${args[0]}.js`);
        try {
            code = fs.readFileSync(`./${files}`, "utf-8");
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
        }

    },
};