if (Number(process.version.slice(1).split('.')[0]) < 12)
  throw new Error(
    'Node 12.0.0 or higher is required. Update Node on your system.'
  );
const Client = require('./src/struct/Client'); // Extended Client
require('./src/struct/Message'); // Extended Message
const client = new Client({
  prefix: 'n?', // Prefix of the bot
  defaultPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'], // Default permissions
  owners: ['253554702858452992', '364062534975881218'], // Owner(s) of the bot
  config: require('./config.js'), //Path to the config.js file
  disabledEvents: [
    'channelUpdate',
    'channelCreate',
    'guildMemberUpdate',
    'presenceUpdate',
  ],
  clientOptions: {
    disableMentions: 'everyone', //disables, that the bot is able to send @everyone
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  },
});
//Client start
client.start();
//client initalization
client.login();
//console.log(client.guilds.cache.get('692311924448297011').ahshja());
client.listentoProcessEvents(['uncaughtException', 'unhandledRejection'], {
  log_on_console: false,
  nologs: false,
  logsonboth: true,
});

client.ws.on(
  'INTERACTION_CREATE',
  /**@param {import('./types/index').Interaction} interaction */ async (
    interaction
  ) => {
    const { data } = interaction;
    const { options, name } = data;
    if (!client.slashs.has(name)) return;
    const args = {};
    if (options) {
      for (const option of options) {
        const { name, value } = option;
        args[name] = value;
      }
    }
    try {
      client.slashs.get(name).execute(interaction, client, args);
    } catch (e) {
      const { message, stack } = e;
      console.log(`Error from command ${name}: ${message}`);
      console.log(`${stack}\n`);
      client.utils
        .replyEphemeral(
          interaction,
          'Sorry, there was an error executing that command!'
        )
        .catch(console.error);
    }
  }
);
