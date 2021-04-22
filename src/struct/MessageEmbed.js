const { MessageEmbed } = require("discord.js")
module.exports = class ExtendedMessageEmbed extends MessageEmbed {
    /**
     * 
     * @param {Boolean} [inline] The inline of the embed, leave it empty will return `false`
     * @returns 
     */
    addBlankField(inline) {
        if(!inline) inline = false;
        // Handling errors
        if(typeof inline !== "boolean") throw new TypeError("The inline cannot be other than a boolean");
        return super.addField("\u200b", "\u200b", inline);
    };

}