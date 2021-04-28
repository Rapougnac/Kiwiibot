
const Client = require('./Client');
const { check } = require("../util/permisionsCheck")
module.exports = class Command {
    /**
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
         * Required permissions by the bot instance
         * @type {Permissions[]}
         */
        if(Array.isArray(command.clientPermissions)) {
            this.clientPermissions = command.clientPermissions;
        } else {
            this.clientPermission = [];
        }

        /**
         * Required permissions of the command author
         * @type {Permissions[]}
         */
        if(Array.isArray(command.permissions)) {
            this.permissions = command.permissions;
        } else {
            this.permissions = [];
        }

        if(typeof command.description !== "string") {
            this.description = "No description provided"
        } else {
            this.description = command.description;
        }
        /**
         * Whether the command can be used in guilds and not in DMs
         * @type {Boolean}
         */
        this.guildOnly = Boolean(command.guildOnly);

        /**
         * Whether the command can be used by the owner of the bot
         * @type {Boolean}
         */
        this.ownerOnly = Boolean(command.ownerOnly);

        /**
         * Whether the command can be used by members with the ADMINISTRATOR permission
         * @type {Boolean}
         */
        this.adminOnly = Boolean(command.adminOnly);

        /**
         * Whether the command can be only used on nsfw channels
         */
        this.nsfw = Boolean(command.nsfw);

    }

    testPermissions(message) {
        return check(message, this, message.client)
    }
}


