const languageSchema = require("./src/models/languageSchema");
const lang = require("./src/assets/json/langs.json");

const guildLanguages = {};

const loadLanguages = async (client) => {
    try {
        for(const guild of client.guilds.cache) {
            const guildID = guild[0];

            const result = await languageSchema.findOne({
                _id: guildID,
            });

            guildLanguages[guildID] = result ? result.language : "english";
        };
    } catch (error) {
        console.error(`⚠️[DATABASE ERROR] The database responded with the following error: ${error.name}`);
    };
};

const setLanguage = (guild, language) => {
    guildLanguages[guild.id] = language.toLowerCase();
}
const language = (guild, textID) => {
    if (guild !== null) {
    if(!lang.translations[textID]){
        throw new Error(`Unknow text id: ${textID}`)
    }

    const selectedLanguage = guildLanguages[guild.id].toLowerCase();

    return lang.translations[textID][selectedLanguage]; 
    } else {
        const selectedLanguage = "english"
        return lang.translations[textID][selectedLanguage]; 
    }
}

module.exports = { loadLanguages, setLanguage, language };
