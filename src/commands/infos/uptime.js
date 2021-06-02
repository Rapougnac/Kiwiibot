//Here the command starts
module.exports = {
    //definition
    name: "uptime", //the name of the command 
    category: "infos", //the category this will be listed at, for the help cmd
    aliases: [], //every parameter can be an alias or empty for no aliases
    cooldown: 10, //this will set it to a 10 second cooldown
    utilisation: "uptime", //this is for the help command for EACH cmd
    description: "Returns the duration on how long the Bot is online", //the description of the command
    guildOnly: false, // if the command can be run in dms
    adminOnly: false, // if the command is only usable by the server adminitrators
    ownerOnly: false, // if the command is only usable by the owner(s)
    permissions: [], // an array of the required permissions by user side
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES"], // an array of the permissions by client side
    string: [], // this is for the traduction
    //running the command with the parameters: client, message, args
    async execute(client, message, args) {
        // a sub function to get the time    
        function duration(ms) { 
            const sec = Math.floor(ms / 1000 % 60).toString();
            const min = Math.floor(ms / (60*1000) % 60).toString();
            const hrs = Math.floor(ms / (60*60*1000) % 60).toString();
            const days = Math.floor(ms / (24*60*60*1000) % 60).toString();
            return `\`${days} Days\`, \`${hrs} Hours\`, \`${min} Minutes\`, \`${sec} Seconds\``
        }
        message.reply(`${this.string[0].format(client.user.username, duration(client.uptime))}`); //sending the uptime
    }
}