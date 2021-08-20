if (Number(process.version.slice(1).split('.')[0]) < 12)
  throw new Error(
    'Node 12.0.0 or higher is required. Update Node on your system.'
  );
require('./src/struct/Message'); // Extended Message
require('./src/struct/Guild'); // Extended Guild
require('./src/struct/User'); // Extended User
require('./src/struct/GuildMember'); // Extended GuildMember
const {
  Interaction,
  CommandInteraction,
  Client,
} = require('./src/struct/main');
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
  /**@param {import('./types/index').Interaction} int */ (int) => {
    let interaction = new Interaction(client, int);
    if (interaction.isCommand()) {
      const interaction = new CommandInteraction(client, int);
      const { commandName: name, options } = interaction;
      const { args } = options;
      if (!client.slashs.has(name)) return;
      try {
        client.slashs.get(name).execute(interaction, client, args);
      } catch (e) {
        const { message, stack } = e;
        console.error(`Error from command ${name}: ${message}\n${stack}`);
        interaction.send('Sorry, there was an error executing that command!', {
          ephemeral: true,
        });
      }
    }
  }
);
