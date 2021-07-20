module.exports = class CommandInteractionOptionResolver {
  constructor(client, options) {
    /**
     * The client that instantiated this.
     * @name CommandInteractionOptionResolver#client
     * @type {Client}
     * @readonly
     */
    Object.defineProperty(this, 'client', { value: client });
    /**
     * The interaction options array
     * @type {import('../../../types/index').SubOptions}
     * @private
     */
    this._options = options ?? [];
    /**
     * The name of the sub command group
     * @type {?string}
     * @private
     */
    this._group = null;

    /**
     * The name of the sub-command.
     * @type {?string}
     * @private
     */
    this._subCommand = null;

    if (this._options[0]?.type === 'SUB_COMMAND_GROUP') {
      this._group = this._options[0].name;
      this._options = this._options[0].options ?? [];
    }
    if (this._options[0]?.type === 'SUB_COMMAND') {
      this._subCommand = this._options[0].name;
      this._options = this._options[0].options ?? [];
    }
  }

  get(name, required = false) {
    const option = this._options.find((opt) => opt.name === name);
    if (!option) {
      if (required) {
        throw new TypeError('Command interaction not foud.');
      }
      return null;
    }
    return option;
  }
  /**
   * Gets the selected sub-command.
   * @returns {string} The name of the selected sub-command.
   */
  getSubCommand() {
    if (!this._subCommand)
      throw new TypeError('SubCommand interaction not foud.');
    return this._subCommand;
  }
  /**
   * Gets the selected sub-command group.
   * @returns {string} The name of the selected sub-command group.
   */
  getSubCommandGroup() {
    if (!this._group) {
      throw new TypeError('SubCommandGroup interaction not foud.');
    }
    return this._group;
  }
};
