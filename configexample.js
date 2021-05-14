module.exports = {
  discord: {
    token: 'TOKEN_HERE', // (required)(https://discord.com/developers/applications)
    prefix: 'PREFIX_HERE', // Required
    text: 'm?help/m?commands',
    activity: 'WATCHING',
    status: 'dnd',
    dev: {
      include_cmd: [],
      exclude_cmd: [],
      active: false, //Default is false, you can put it to true to exclude or include commands
    },
    defaultPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
  },
  emojis: {
    off: '❌',
    error: '⚠️',
    queue: '📊',
    music: '🎵',
    success: '✅',
  },
  ytsearcher: {
    key: 'YT_SEARCH_KEY_HERE', // Optionnal
  },
  amethyste: {
    client:
      'AMETHYSTE_KEY_HERE', // (optional, but mostly of images manipulation won\'t work)(https://api.amethyste.moe/) get one here, sign up and copy and paste your token
  },
  filters: [
    '8D',
    'gate',
    'haas',
    'phaser',
    'treble',
    'tremolo',
    'vibrato',
    'reverse',
    'karaoke',
    'flanger',
    'mcompand',
    'pulsator',
    'subboost',
    'bassboost',
    'vaporwave',
    'nightcore',
    'normalizer',
    'surrounding',
  ],
  channels: {
    debug: '838362111545442354',
    votes: '809665224377761813',
    uploads: '806949058710339655',
    logs: '806129974011887706',
  },
  allowedFeatures: ['ANISCHEDULE', 'CHATBOT', 'EXPERIENCE_POINTS'],
  clientMap: {
    web: '🌐',
    mobile: '📱',
    desktop: '💻',
  },
  colors: {
    base: '7289da',
    positive: '3498db',
    neutral: 'e67e22',
    negative: 'e91e63',
  },
  database: {
    enable: true,
    URI: 'MONGO_URI_HERE', // (optional but there'll be no database)
    config: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    },
  },
  verificationLVL: {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻',
  },
  chatbot: {
    id: 'ID_HERE', // (optional but the chatbot function will not work)(get a id & key here)[https://brainshop.ai/]
    key: 'KEY_HERE', // Same as the id 
  },
};
