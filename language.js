const languageSchema = require("./models/languageSchema");
const lang = require("./langs.json");


const loadLanguages = async (client) => {
    try {
        for(const guild of client.guilds.cache) {
            const guildID = guild[0];

            const result = await languageSchema.findOne({
                _id: guildID,
            })

            console.log("Result:", result)
        }
    } catch (error) {
        message.channel.send(`⚠️[DATABASE ERROR] The database responded with the following error: ${error.name} \n${error}`)
    }
}

module.exports.loadLanguages = loadLanguages;