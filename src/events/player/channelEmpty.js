const { language } = require('../../../language')
module.exports = (client, message, queue) => {
    message.channel.send(language(message.guild, 'channelEmpty')[0].format(client.emotes.error));
};