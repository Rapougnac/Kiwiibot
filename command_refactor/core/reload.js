const config = require('../../config.json');

module.exports = {
    name: 'reload',
    aliases: [],
    description: 'Reload the bot',
    category: 'Core',
    utilisation: '{prefix}reload',
    execute(client, message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;

        console.clear();
        client.destroy()
        client.login(config.toke);
        message.channel.send(`Reloaded ${client.config.emojis.success}`);
        return;
    },
};
