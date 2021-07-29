const Interaction = require('./Interaction');
const { ApplicationCommandOptionTypes } = require('../../util/constants');
const {
  APIMessage,
  Message,
  MessageReaction,
  User,
  GuildMember,
  Channel,
  Role,
} = require('discord.js');
const CommandInteractionOptionResolver = require('./CommandInteractionOptionResolver');
module.exports = class CommandInteraction extends Interaction {
  constructor(client, data) {
    super(client, data);
    /**
     * The invoked application command's id
     * @type {import('discord.js').Snowflake}
     */
    this.commandId = data.data.id;

    /**
     * The invoked application command's name
     * @type {string}
     */
    this.commandName = data.data.name;
    /**
     * The options passed in the command
     */
    this.options = new CommandInteractionOptionResolver(
      this.client,
      data.data.options?.map((option) =>
        this.transformOption(option, data.data.resolved)
      )
    );
  }
  /**
   * Send
   * @param {string} content The content of the message to send
   * @param {{ ephemeral?: boolean, response?: string }} [options] If the interaction should be ephemeral
   * @returns {Promise<*>}
   */
  async send(content, options = { ephemeral: false }) {
    let data;
    if (options.ephemeral)
      data = {
        flags: 1 << 6,
        content: content,
      };
    else data = { content: content };
    if (typeof content === 'object' && !options.ephemeral)
      data = await createAPIMessage(content, this.channel, options.response);
    else if (typeof content === 'object' && options.ephemeral)
      throw new RangeError("You can't send embeds with ephemeral");

    return this.client.api.interactions(this.id, this.token).callback.post({
      data: {
        type: 4,
        data,
      },
    });
  }

  /**
   * Options for deferring the reply to an {@link Interaction}.
   * @typedef {Object} InteractionDeferOptions
   * @property {boolean} [ephemeral] Whether the reply should be ephemeral
   * @property {boolean} [fetchReply] Whether to fetch the reply
   */

  /**
   * Defers the reply to this interaction.
   * @param {InteractionDeferOptions} [options]
   * @returns {Promise<Message|void>}
   */
  async defer(options = {}) {
    this.ephemeral = options.ephemeral ?? false;
    await this.client.api.interactions(this.id, this.token).callback.post({
      data: {
        type: 5,
        data: {
          flags: options.ephemeral ? 1 << 6 : undefined,
        },
      },
    });

    return options.fetchReply ? await this.fetchReply() : undefined;
  }
  /**
   *
   * @param {string} content The content of the message
   * @param {{response?: string}} [options]
   * @returns {Promise<*>}
   */
  async edit(content, options = { response: '' }) {
    let data = {
      content: content,
    };
    if (typeof content === 'object')
      data = await createAPIMessage(content, this.channel, options.response);
    return await this.client.api
      .webhooks(this.client.user.id, this.token)
      .messages('@original')
      .patch({
        data,
      });
  }
  /**
   * Delete the message
   * @param {number} [timeout=0] The time to wait to delete the message from the interaction
   * @returns {Promise<*>}
   */
  async delete(timeout = 0) {
    if (timeout <= 0) {
      return await this.client.api
        .webhooks(this.client.user.id, this.token)
        .messages('@original')
        .delete();
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.delete());
        }, timeout);
      });
    }
  }
  /**
   *
   * @param {string} emoji The emoji to pass in, refers to {@link Message#react()}
   * @returns {Promise<MessageReaction>}
   */
  async react(emoji) {
    emoji = this.client.emojis.resolveIdentifier(emoji);
    if (!emoji) throw new TypeError('Invalid emoji.');
    const msg = await this.client.api
      .webhooks(this.client.user.id, this.token)
      .messages('@original')
      .get();
    const message = new Message(this.client, msg, this.channel);
    return message.react(emoji);
  }

  async fetchReply() {
    if (this.ephemeral) throw new Error('This interaction is ephemeral.');
    const msg = await this.client.api
      .webhooks(this.client.user.id, this.token)
      .messages('@original')
      .get();
    return new Message(this.client, msg, this.channel);
  }
  /**
   * Transform the options of the CommandInteraction
   * @param {object} option The options to pass in
   * @param {obejct} resolved The resolved option
   * @returns {{name: any, type: any}}
   */
  transformOption(option, resolved) {
    const result = {
      name: option.name,
      type: ApplicationCommandOptionTypes[option.type],
    };

    if ('value' in option) result.value = option.value;
    if ('options' in option)
      result.options = option.options.map((opt) =>
        this.transformOption(opt, resolved)
      );

    if (resolved) {
      const user = resolved.users?.[option.value];
      if (user) {
        result.user = this.client.users.add(user);
        if (!(result.user instanceof User))
          result.user = this.client.users.resolve(user);
      }
      const member = resolved.members?.[option.value];
      if (member) {
        result.member = this.guild?.members.add({ user, ...member }) ?? member;
        if (!(result.member instanceof GuildMember))
          result.member =
            this.guild?.members.add({ user, ...member }) ?? member;
      }
      const channel = resolved.channels?.[option.value];
      if (channel) {
        result.channel =
          this.client.channels.add(channel, this.guild) ?? channel;
        if (!(result.channel instanceof Channel))
          result.channel =
            this.client.channels.add(channel, this.guild) ?? channel;
      }
      const role = resolved.roles?.[option.value];
      if (role) {
        result.role =
          this.guild?.roles.resolve(role.id) ??
          this.guild?.roles.add(role) ??
          role;
        if (!(result.role instanceof Role))
          result.role =
            this.guild?.roles.resolve(role.id) ??
            this.guild?.roles.add(role) ??
            role;
      }
    }

    return result;
  }
};

async function createAPIMessage(content, channel, response) {
  const { data, files } = await APIMessage.create(channel, response, content)
    .resolveData()
    .resolveFiles();
  return { ...data, files };
}
