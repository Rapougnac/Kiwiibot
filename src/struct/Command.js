
const Client = require('./Client');
const { Permissions } = require("discord.js");

class Command {
    /**
     * 
     * @param {Client} client The client from `./Client`
     * @param {Object} command 
     */
    constructor(client, command) {
        /**
         * Client that this command is for
         * @name Command#client
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, "client",  { value: client });

        /**
         * Name of the command
         * @type {string}
         */
        this.name = command.name;

        /**
         * Aliase(s) of this command
         * @type {string[]}
         */
        this.aliases = command.aliases || [];
        if(Array.isArray(this.aliases)) {
            this.aliases = [];
        }

        /**
         * Cooldown of this command
         * @type {number}
         */
        this.cooldown = command.cooldown;

        /**
         * 
         */
        this.permissions = new Permissions(command.permissions).freeze();

        this.clientPermissions = new Permissions()
    }
}
