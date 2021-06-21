const { language } = require('../../../language');
module.exports = (client, message, query, tracks, content, collector) => {
    message.channel.send(language(message.guild, 'searchInvalidResponse')[0].format(client.emotes.error, tracks.length));
};