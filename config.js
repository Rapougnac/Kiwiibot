const settings = {
  // pass in any client configuration you want for the bot.
  // more client options can be found at
  // https://discord.js.org/#/docs/main/stable/typedef/ClientOptions
  client: {
    presence: {
      activity: {
        name: 'Testing',
        type: 'COMPETING'
      }
    },
    // Disable Mentions except Users
    allowedMentions: {parse: ['users']},
    // Sweep messages every 12 hours
    messageCacheLifetime: 43200,
    messageSweepInterval: 43200
  },
  // set the default prefix, if non-string data-type is provided, will resolve
  // to the prefix 'n?'
  prefix: 'n?',

  // allowed features for the bot, you can add/remove features you want.
  allowedFeatures: [ 'ANISCHEDULE', 'CHATBOT', 'EXPERIENCE_POINTS'],

  // logging channels for the bot. To disable logging specific events - pass
  // a falsy value (undefined, null, 0). You may also remove the property
  // altogether, although this is not preferred.
  channels: { debug: '792385081850986496', votes: '809665224377761813', uploads: '806949058710339655', logs: '806129974011887706' },

  // enable/disable database system in the bot, this will automatically disable
  // all commands and features that requires database if disabled.
  database: {
    enable: true,
    uri: process.env.MONGO_URI,
    config: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    }
  },
  
  // Array of owners recognized by the bot. ID here will be given access to
  // owner based commands.
  owners: [ '253554702858452992' ],

  // websites affiliated with the bot, can be accessed through
  // Client#config#websites
  websites: {
    "repository":"https://github.com/maisans-maid/Mai#readme/",
    "website": "https://mai-san.ml/",
    "invite": "https://invite.mai-san.ml/",
    "support": "https://support.mai-san.ml/",
    "docs": "https://mai-san.ml/docs/getting%20started/welcome/",
    "top.gg": "https://top.gg/bot/702074452317307061/",
    "DBL": "https://discordbotlist.com/bots/mai-3909/"
  }
};

module.exports = settings;
