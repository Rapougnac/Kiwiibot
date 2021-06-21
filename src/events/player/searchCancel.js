const { language } = require('../../../language');
module.exports = (client, message, query, tracks) => {
    message.channel.send(language(message.guild, 'searchCancel')[0].format(client.emotes.error));
};