const math = require('mathjs');
module.exports = {
    name: 'calc',
    aliases: [],
    description: 'Calculate',
    category: 'Misc',
    utilisation: '{prefix}calc',
    async execute(client, message, args) {
        try {
            message.channel.send(`The response of ${args} is ${math.evaluate(args)}`);
        } catch (err) {
            if (err) message.channel.send(`**${err.message}**`);
        }
    },
};
