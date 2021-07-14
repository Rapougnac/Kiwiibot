const Command = require('../../struct/Command');
module.exports = class AutoNOU extends Command {
    constructor(client) {
        super(client, {
            name: 'no-u',
            aliases: ['no-you'],
            description: 'no u',
            category: 'auto',
        });
    }
    execute() {
        this.message.channel.send('no u');
    }
}