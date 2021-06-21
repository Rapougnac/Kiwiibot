const { language } = require('../../../language');
module.exports = (client, message, query) => {
    message.channel.send(language(message.guild, 'noResults')[0].format(client.emotes.error, query));
};