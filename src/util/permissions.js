module.exports = {
  // permissions: {
  //   CREATE_INSTANT_INVITE: 1,
  //   KICK_MEMBERS: 2,
  //   BAN_MEMBERS: 4,
  //   ADMINISTRATOR: 8,
  //   MANAGE_CHANNELS: 16,
  //   MANAGE_GUILD: 32,
  //   ADD_REACTIONS: 64,
  //   VIEW_AUDIT_LOG: 128,
  //   PRIORITY_SPEAKER: 256,
  //   VIEW_CHANNEL: 1024,
  //   READ_MESSAGES: 1024,
  //   SEND_MESSAGES: 2048,
  //   SEND_TTS_MESSAGES: 4096,
  //   MANAGE_MESSAGES: 8192,
  //   EMBED_LINKS: 16384,
  //   ATTACH_FILES: 32768,
  //   READ_MESSAGE_HISTORY: 65536,
  //   MENTION_EVERYONE: 131072,
  //   EXTERNAL_EMOJIS: 262144,
  //   USE_EXTERNAL_EMOJIS: 262144,
  //   CONNECT: 1048576,
  //   SPEAK: 2097152,
  //   MUTE_MEMBERS: 4194304,
  //   DEAFEN_MEMBERS: 8388608,
  //   MOVE_MEMBERS: 16777216,
  //   USE_VAD: 33554432,
  //   CHANGE_NICKNAME: 67108864,
  //   MANAGE_NICKNAMES: 134217728,
  //   MANAGE_ROLES: 268435456,
  //   MANAGE_ROLES_OR_PERMISSIONS: 268435456,
  //   MANAGE_WEBHOOKS: 536870912,
  //   MANAGE_EMOJIS: 1073741824,
  // },
  permissions: [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'VIEW_CHANNEL',
    'READ_MESSAGES',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'EXTERNAL_EMOJIS',
    'USE_EXTERNAL_EMOJIS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_ROLES_OR_PERMISSIONS',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ],
  /**
   * @param {Object} obj
   * @returns {string|string[]}
   */
  resolvePermission: (obj) => {
    if (obj instanceof Array)
      return obj.flat().map(module.exports.resolvePermission);
    if (!isNaN(Number(obj))) {
      const vals = Object.values(module.exports.permissions);
      if (vals.includes(Number(obj)))
        return Object.keys(module.exports.permissions).find(
          (k) => module.exports.permissions[k] === Number(obj)
        );
    }
    if (typeof obj === 'string') {
      const str = obj
        .trim()
        .toUpperCase()
        .replace(/[^A-Z _]+/g, '')
        .replace(/(\s|-)/g, '_');
      if (Object.keys(module.exports.permissions).includes(str)) return str;
      return null;
    }
    return void console.warn(
      'Invalid permission resolvable type ' +
        (obj && obj.constructor ? obj.constructor.name : null)
    );
  },
  /**
   *
   * @param {Object} obj
   * @returns {Number}
   */
  getBitfield: (obj = Object.keys(module.exports.permissions)) => {
    if (typeof obj === 'string') {
      const str = module.exports.resolvePermission(obj);
      if (!str) return 0;
      return module.exports.permissions[str];
    }
    if (typeof obj === 'number') {
      const vals = Object.values(module.exports.permissions);
      if (vals.includes(obj)) return obj;
      return null;
    }
    if (obj instanceof Array)
      return obj
        .map(module.exports.getBitfield)
        .filter((x) => x)
        .reduce((v, bn) => v | bn, 0x0);
  },
  generateInvite: (clientID = '823158943214862357', permissions = 8) => {
    if (typeof clientID !== 'string') return;
    const matched = clientID.match(/[0-9]{16,20}/);
    if (!matched) return;

    clientID = matched[0];
    permissions = module.exports.getBitfield(permissions);

    if (permissions)
      return `https://discordapp.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=${permissions}`;
  },
};
