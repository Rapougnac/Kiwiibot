const { Presence } = require("discord.js");
module.exports = class ExtendedPresence extends Presence {
    constructor(settings) {
        super(settings.data || {});

        this.presence = (x);
    }
};