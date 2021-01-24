const config = require('../../config.json');

module.exports = {
    name: 'reload',
    aliases: [],
    description: 'Reload the bot',
    category: 'Core',
    utilisation: '{prefix}reload',
    execute(client, message, args) {
        console.clear();
        client.destroy()
        client.login(config.toke);
        message.channel.send("Reloaded :white_check_mark:");
        return;
    },
};
