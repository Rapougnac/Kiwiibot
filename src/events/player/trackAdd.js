const { language } = require('../../../language');
module.exports = (client, message, queue, track) => {
    message.channel.send(language(message.guild, 'trackAdd')[0].format(client.emotes.music, track.title));
};