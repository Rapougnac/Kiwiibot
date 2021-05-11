const { MessageEmbed } = require("discord.js");

/**
 * An extended version of the `MessageEmbed`
 * @extends MessageEmbed
 */
module.exports = class ExtendedMessageEmbed extends MessageEmbed {
    /**
     * @param {Boolean} [inline] The inline of the embed, leave it empty will return `false`
     * @returns 
     */
    addBlankField(inline) {
        if(!inline) inline = false;
        // Handling errors
        if(typeof inline !== "boolean") throw new TypeError("The inline cannot be other than a boolean");
        return super.addField("\u200b", "\u200b", inline);
    }
    setTitle(title) {
        title = resolveString(title);
        if (title.length > 256) throw new RangeError('RichEmbed titles may not exceed 256 characters.');
        this.title = title;
        return this;
    }

};

const resolveString = (data) =>  {
    if(typeof data === 'string') return data;
    if(data instanceof Array) return data.join('\n');
    return String(data);
}