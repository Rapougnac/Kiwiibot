const figlet = require("figlet"); // MAKE SURE TO INSTALL FIGLET PACKAGE OR CODE WONT WORK

module.exports = {
    name: 'ascii',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}ascii',
    execute(client, message, args) {
        //const args = message.content.slice(prefix.length).trim().split(/ +/g);
        let text = args.slice(1).join(" ");

        if (!text) {
            return message.channel.send('Please provide text for the ascii conversion!')
        }
        let maxlen = 20
        if (text.length > 20) {
            return message.channel.send("Please put text that has 20 characters or less because the conversion won't be good!")
        }
        // AGAIN, MAKE SURE TO INSTALL FIGLET PACKAGE!
        figlet(text, function (err, data) {
            message.channel.send(data, {
                code: 'AsciiArt'
            });
        });
    },
};
