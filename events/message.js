const config = require('../config.json');

module.exports = (client, message) => {
    const prefix = config.discord.default_prefix.toLowerCase();
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command) && !client.aliases.has(command)) return;

    try {
        const command_to_execute = client.commands.get(command) || client.aliases.get(command);
        command_to_execute.execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!' + error);
    }
};