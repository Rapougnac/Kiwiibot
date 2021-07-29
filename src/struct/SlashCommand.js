const Client = require('./Client');
module.exports = class SlashCommand {
  /**
   *
   * @param {Client} client The client that instanciated this.
   * @param {import('../../types').SlashCommand} options
   */
  constructor(client, options) {
    /**
     * The client that instanciated this.
     * @type {Client}
     */
    this.client = client;
    /**
     * The name of the command.
     * @type {string}
     */
    this.name = options.name;
    /**
     * The description of the command
     * @type {string}
     */
    this.description = options.description;
    /**
     * If the command should be global
     * @type {boolean}
     */
    this.global = options.global || false;
    /**
     * The options of the command
     * @type {import('../../types').CommandOptions}
     */
    this.commandOptions = options.commandOptions;
  }

  execute() {
    throw new Error(`${this.name} dosen't have an execute() method!`);
  }
};
