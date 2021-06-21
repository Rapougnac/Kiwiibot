const { language } = require('../../../language')
module.exports = (client, message, queue) => {
    const { guild } = message;
    message.channel.send(language(guild, 'botDisconnect')[0].format(client.emotes.error))
};