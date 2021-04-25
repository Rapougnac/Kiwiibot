module.exports = class Utils {
    constructor(client) {
        this.client = client;
    }

    /**
     * 
     * @param {*} perms 
     */
    formatPerms(perms) {
        return perms
            .toLowerCase()
            .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
            .replace(/_/g, " ")
            .replace(/Guild/g, "Server")
            .replace(/Use Vad/g, "Use Voice Activity")
    }

    formatArray(array, type = "conjunction") {
        return new Intl.ListFormat("en-US", { style: "short", type: type }).format(array)
    }
}