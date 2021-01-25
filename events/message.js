const config = require('../config.json');

module.exports = (client, message) => {
    if (!message.content.startsWith(config.discord.prefix) || message.author.bot) return;

    const args = message.content.slice(config.discord.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)&&!client.aliases.has(command)) return;

    try {
        const command_to_execute = client.commands.get(command) || client.aliases.get(command);
        command_to_execute.execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
};