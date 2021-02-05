module.exports = {
    name: 'reverse',
    aliases: [],
    category: 'Misc',
    description: 'Reverses the supplied text',
    execute(client, message, args) {
    message.channel.send(args.join(' ').split('').reverse().join(' ') || 'No text to reverse.')

    }
};