module.exports = class Event {
  /**
   *
   * @param {import('./Client')} client The client to pass in
   * @param {string} name The name of the event
   * @param {{ once?: boolean; emitter?: string | boolean; name: ClientEvents }} options If the event should be once or on
   * @example
   * Client.once('event') // If enabled
   */
  constructor(client, options = {}) {
    this.client = client;
    /**
     * @type {import('discord.js').ClientEvents}
     */
    this.name = options.name;
    this.type = options.once ? 'once' : 'on';
    this.emitter =
      typeof options.emitter === 'string'
        ? this.client[options.emitter]
        : options.emitter || this.client;
    this._validate(options, this.client);
  }

  async execute() {
    throw new Error(`${this.name} dosen't have an execute() method!`);
  }
  /**
   * Validate the event
   * @param {object} data Data
   * @private
   */
  _validate(data, client) {
    const events = [
      'applicationCommandCreate',
      'applicationCommandDelete',
      'applicationCommandUpdate',
      'channelCreate',
      'channelDelete',
      'channelPinsUpdate',
      'channelUpdate',
      'debug',
      'emojiCreate',
      'emojiDelete',
      'emojiUpdate',
      'error',
      'guildBanAdd',
      'guildBanRemove',
      'guildCreate',
      'guildDelete',
      'guildIntegrationsUpdate',
      'guildMemberAdd',
      'guildMemberAvailable',
      'guildMemberRemove',
      'guildMembersChunk',
      'guildMemberUpdate',
      'guildUnavailable',
      'guildUpdate',
      'interaction',
      'interactionCreate',
      'invalidated',
      'invalidRequestWarning',
      'inviteCreate',
      'inviteDelete',
      'message',
      'messageCreate',
      'messageDelete',
      'messageDeleteBulk',
      'messageReactionAdd',
      'messageReactionRemove',
      'messageReactionRemoveAll',
      'messageReactionRemoveEmoji',
      'messageUpdate',
      'presenceUpdate',
      'rateLimit',
      'ready',
      'roleCreate',
      'roleDelete',
      'roleUpdate',
      'shardDisconnect',
      'shardError',
      'shardReady',
      'shardReconnecting',
      'shardResume',
      'stageInstanceCreate',
      'stageInstanceDelete',
      'stageInstanceUpdate',
      'stickerCreate',
      'stickerDelete',
      'stickerUpdate',
      'threadCreate',
      'threadDelete',
      'threadListSync',
      'threadMembersUpdate',
      'threadMemberUpdate',
      'threadUpdate',
      'typingStart',
      'userUpdate',
      'voiceStateUpdate',
      'warn',
      'webhookUpdate',
    ];
    if (!data.name) {
      console.error(new Error('This event has not a name!'));
      process.exit(1);
    }
    if (!events.includes(data.name)) {
      console.error(new Error('This event is not part of the events!'));
      process.exit(1);
    }
  }
};

/**
 * @typedef {'applicationCommandCreate' | 'applicationCommandDelete' | 'applicationCommandUpdate' | 'channelCreate' | 'channelDelete' | 'channelPinsUpdate' | 'channelUpdate' | 'debug' | 'emojiCreate' | 'emojiDelete' | 'emojiUpdate' | 'error' | 'guildBanAdd' | 'guildBanRemove' | 'guildCreate' | 'guildDelete' | 'guildIntegrationsUpdate' | 'guildMemberAdd' | 'guildMemberAvailable' | 'guildMemberRemove' | 'guildMembersChunk' | 'guildMemberUpdate' | 'guildUnavailable' | 'guildUpdate' | 'interaction' | 'interactionCreate' | 'invalidated' | 'invalidRequestWarning' | 'inviteCreate' | 'inviteDelete' | 'message' | 'messageCreate' | 'messageDelete' | 'messageDeleteBulk' | 'messageReactionAdd' | 'messageReactionRemove' | 'messageReactionRemoveAll' | 'messageReactionRemoveEmoji' | 'messageUpdate' | 'presenceUpdate' | 'rateLimit' | 'ready' | 'roleCreate' | 'roleDelete' | 'roleUpdate' | 'shardDisconnect' | 'shardError' | 'shardReady' | 'shardReconnecting' | 'shardResume' | 'stageInstanceCreate' | 'stageInstanceDelete' | 'stageInstanceUpdate' | 'stickerCreate' | 'stickerDelete' | 'stickerUpdate' | 'threadCreate' | 'threadDelete' | 'threadListSync' | 'threadMembersUpdate' | 'threadMemberUpdate' | 'threadUpdate' | 'typingStart' | 'userUpdate' | 'voiceStateUpdate' | 'warn' | 'webhookUpdate'} ClientEvents
 */
