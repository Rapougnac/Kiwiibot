/**
 * 
 */
module.exports = class Base {
    /**
     * 
     * @param {*} client 
     * @param {*} command 
     */
    constructor(client, command) {

        /**
         * Client that this command is for
         * @name Base#client
         */
        Object.defineProperty(this, "client", { value: client });
    };
};