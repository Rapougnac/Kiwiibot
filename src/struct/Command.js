/// <reference path="../../types/index.d.ts" />
const Client = require('./Client');
const { Collection, MessageEmbed, Message } = require('discord.js');
const path = require('path');
const glob = require('glob');
/**
 * Represents a command
 */
module.exports = class Command {
  /**
   * @typedef {['CREATE_INSTANT_INVITE'|'KICK_MEMBERS'|'BAN_MEMBERS'|'ADMINISTRATOR'|'MANAGE_CHANNELS'|'MANAGE_GUILD'|'ADD_REACTIONS'|'VIEW_AUDIT_LOG'
   * |'PRIORITY_SPEAKER'|'STREAM'|'VIEW_CHANNEL'|'SEND_MESSAGES'|'SEND_TTS_MESSAGES'|'MANAGE_MESSAGES'|'EMBED_LINKS'|'ATTACH_FILES'|'READ_MESSAGE_HISTORY'
   * |'MENTION_EVERYONE'|'USE_EXTERNAL_EMOJIS'|'VIEW_GUILD_INSIGHTS'|'CONNECT'|'SPEAK'|'MUTE_MEMBERS'|'DEAFEN_MEMBERS'|'MOVE_MEMBERS'|'USE_VAD'
   * |'CHANGE_NICKNAME'|'MANAGE_NICKNAMES'|'MANAGE_ROLES'|'MANAGE_WEBHOOKS'|'MANAGE_EMOJIS']} PermissionString
   */

  /**
   * @param {Client} client
   * @param {object} options
   * @param {string} options.name The name of the command
   * @param {string} [options.description] The description of the command
   * @param {string} [options.utilisation] The usage of the command
   * @param {string} [options.category] The category of the command
   * @param {PermissionString} [options.permissions] The user's permissions, if no permissions was provided `['SEND_MESSAGES', 'VIEW_CHANNEL']` are the default one.
   * @param {PermissionString} [options.clientPermissions] The client's permissions, if no permissions was provided `['SEND_MESSAGES', 'VIEW_CHANNEL']` are the default one.
   * @param {number} [options.cooldown] The cooldown of the command, none if the cooldown was not specified
   * @param {string[]} [options.aliases] The aliases of the command, none if aliases was not specified
   * @param {boolean} [options.guildOnly=false] If the command can be used inside the guild only or not, `false` by default
   * @param {boolean} [options.adminOnly=false] If the command can be only used by user's who have the administrator permission, `false` by default
   * @param {boolean} [options.ownerOnly=false] If the command can only be executed by the owner of the bot, `false` by default
   * @param {boolean} [options.nsfw=false] If the command is nsfw or not, `false` by default
   * @param {string[]} [options.string] This is used to pass the translation
   * @param {boolean} [options.hidden=false] Whether the command should be hidden from the help menu
   * @param {RegExp[]} [options.patterns] Regex that trigger the command
   */
  constructor(client, options) {
    /**
     * The client used in the command
     * @type {Client}
     */
    this.client = client;

    this.help = {
      /**
       * The name of the command
       * @type {String}
       */
      name: options.name,
      /**
       * The description of the command
       * @type {String}
       */
      description: options.description,
      /**
       * The usage of the command
       * @type {String}
       */
      utilisation: options.utilisation,
      /**
       * The category of the command
       * @type {String}
       */
      category: options.category,
    };
    this.config = {
      /**
       * The user's permissions, if no permissions was provided
       * ```js
       * ['SEND_MESSAGES', 'VIEW_CHANNEL']
       * ```
       * are the default one
       * @type {PermissionString}
       */
      permissions: options.permissions || ['SEND_MESSAGES', 'VIEW_CHANNEL'],
      /**
       * The client's permissions, if no permissions was provided
       * ```js
       * ['SEND_MESSAGES', 'VIEW_CHANNEL']
       * ```
       * are the default one
       * @type {PermissionString}
       */
      clientPermissions: options.clientPermissions || [
        'SEND_MESSAGES',
        'VIEW_CHANNEL',
      ],
      /**
       * The cooldown of the command, none if the cooldown was not specified
       * @type {number}
       */
      cooldown: options.cooldown * 1000 || -1,
      /**
       * The aliases of the command, none if aliases was not specified
       * @type {string[]}
       */
      aliases: options.aliases || [],
      /**
       * If the command can be used inside the guild only or not, `false` by default
       * @type {boolean}
       */
      guildOnly: options.guildOnly || false,
      /**
       * If the command can be only used by user's who have the administrator permission, `false` by default
       * @type {boolean}
       */
      adminOnly: options.adminOnly || false,
      /**
       * If the command can only be executed by the owner of the bot, `false` by default
       * @type {boolean}
       */
      ownerOnly: options.ownerOnly || false,
      /**
       * If the command is nsfw or not, `false` by default
       * @type {boolean}
       */
      nsfw: options.nsfw || false,
      /**
       * This is used to pass the translation
       * @type {String[]}
       */
      string: options.string,
      /**
       * Whether the command should be hidden from the help menu
       * @type {boolean}
       */
      hidden: options.hidden || false,
    };
    /**
     * A set of the ids of the users on cooldown
     * @type {Collection}
     */
    this.cooldown = new Collection();
    /**
     * @type {RegExp[]}
     */
    this.patterns = options.patterns;
  }
  /**
   * Trace the command
   * @private
   */
  trace({ command = this.help.name, dir = false } = {}) {
    let files = glob.sync('./src/commands/**/*.js');
    let Path;
    const exclude = this.client.config.discord.dev.exclude_cmd;
    const include = this.client.config.discord.dev.include_cmd;
    if (this.client.config.discord.dev.active) {
      if (include.length) {
        files = files.filter((file) => include.includes(path.parse(file).base));
      }
      if (exclude.length) {
        files = files.filter(
          (file) => !exclude.includes(path.parse(file).base)
        );
      }
    }
    for (const file of files) {
      const filePath = path.resolve(file);
      const fileName = path.basename(filePath, path.extname(filePath));
      const filePathDir = path.dirname(filePath);
      if (fileName === command)
        return dir ? (Path = filePathDir) : (Path = filePath);
    }
    return Path;
  }
  /**
   * Reload a command
   * @param {string} [commandName] The command to reload
   */
  reload(commandName = this.help.name) {
    if (
      !(
        this.client.commands.has(commandName) ||
        this.client.aliases.has(commandName)
      )
    )
      return this.message.inlineReply("This commmand dosen't exist !");
    const cmdPath = this.trace({ command: commandName });
    delete require.cache[require.resolve(cmdPath)];
    this.client.commands.delete(commandName);
    /**@type {Command} */
    const command = new (require(cmdPath))(this.client);
    if (this.client.commands.has(command.help.name)) {
      console.error(
        new Error(`Command name duplicate: ${command.help.name}`).stack
      );
      return process.exit(1);
    }
    this.client.commands.set(commandName, command);
    // if (command.config.aliases) {
    //   command.config.aliases.forEach((alias) => {
    //     if (this.client.aliases.has(alias)) {
    //       console.error(
    //         new Error(`Alias name duplicate: ${command.config.aliases}`).stack
    //       );
    //       return process.exit(1);
    //     } else {
    //       this.client.aliases.set(alias, command);
    //     }
    //   });
    // }
  }
  /**
   * Unload a command
   * @param {string} [commandName] The command to unload
   */
  unload(commandName = this.help.name) {
    const cmdPath = this.trace({ command: commandName });
    delete require.cache[cmdPath];
    this.client.commands.delete(commandName);
  }

  load(commandName) {
    const cmdPath = this.trace({ command: commandName });
    const command = new (require(cmdPath))(this.client);
    this.client.commands.set(commandName, command);
  }

  /**
   * Set the message
   * @param {Message} message
   */
  setMessage(message) {
    this.message = message;
  }

  respond(message) {
    this.message.channel.send(message);
  }

  /**
   *
   * @param {String} message The message to pass in
   * @param {Object} [options] The options
   * @returns {Promise<Message>}
   */
  async inlineReply(message, options = {}) {
    if (!options)
      options = {
        allowedMentions: {
          repliedUser: false,
        },
      };
    this.message.inlineReply(message, options);
  }
  execute() {
    throw new Error(`${this.help.name} doesn't have an execute() method.`);
  }
};
