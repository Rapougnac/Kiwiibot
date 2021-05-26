const figlet = require("figlet");

module.exports = {
    name: 'ascii',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}ascii',
    async execute(client, message, args) {
        let text = args.join(" ");

        if (!text) {
            return message.channel.send('Please provide text for the ascii conversion!')
        }

        
        if (text.length > 20) {
            return message.channel.send("Please put text that has 20 characters or less because the conversion won't be good!")
        }
        figlet(text, function (err, data) {
            message.channel.send(data, {
                code: 'AsciiArt'
            });
        });
    },
};
