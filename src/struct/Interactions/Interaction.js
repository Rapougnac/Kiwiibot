const {
  Base,
  SnowflakeUtil,
  User,
  Guild,
  Channel,
  GuildMember,
} = require('discord.js');
const {
  InteractionTypes,
  MessageComponentTypes,
} = require('../../util/constants');
/**
 * Represents an interaction
 * @extends {Base}
 */
class Interaction extends Base {
  constructor(client, data) {
    super(client);
    /**
     * The interaction's type
     * @type {import('../../util/constants').InteractionType}
     */
    this.type = InteractionTypes[data.type];
    /**
     * The interaction's id.
     * @type {import('discord.js').Snowflake}
     */
    this.id = data.id;
    /**
     * The interaction's token
     * @type {string}
     * @name Interaction#token
     * @readonly
     */
    Object.defineProperty(this, 'token', { value: data.token });
    /**
     * The application's id.
     * @type {import('discord.js').Snowflake}
     */
    this.applicationId = data.application_id;
    /**
     * The id of the channel this interaction was sent in.
     * @type {?import('discord.js').Snowflake}
     */
    this.channelId = data.channel_id ?? null;

    /**
     * The id of the guild this interaction was sent in
     * @type {?import('discord.js').Snowflake}
     */
    this.guildId = data.guild_id ?? null;
    /**
     * The user wich sent this interaction
     * @type {User}
     */
    this.user = this.client.users.add(data.user ?? data.member.user);
    /**
     * If the interaction was sent in a guild, the member wich sent it
     * @type {?GuildMember}
     */
    this.member = data.member
      ? this.guild?.members.add(data.member) ?? data.member
      : null;
    /**
     * The version
     * @type {number}
     */
    this.version = data.version;
  }

  get createdTimestamp() {
    return SnowflakeUtil.deconstruct(this.id).timestamp;
  }

  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * The channel this interaction was sent in
   * @type {?Channel}
   * @readonly
   */
  get channel() {
    return this.client.channels.cache.get(this.channelId) ?? null;
  }

  /**
   * The guild this interaction was sent in
   * @type {?Guild}
   * @readonly
   */
  get guild() {
    return this.client.guilds.cache.get(this.guildId) ?? null;
  }
  /**
   * Indicates whether this interaction is received from a guild.
   * @returns {boolean}
   */
  inGuild() {
    return Boolean(this.guildId && this.member);
  }
  /**
   * Indicates whether this interaction is a {@link CommandInteraction}.
   * @returns {boolean}
   */
  isCommand() {
    return InteractionTypes[this.type] === InteractionTypes.APPLICATION_COMMAND;
  }
}

module.exports = Interaction;
