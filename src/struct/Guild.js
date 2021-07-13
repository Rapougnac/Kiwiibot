const { Guild, Structures } = require('discord.js');
const { I18n } = require('i18n');
const path = require('path');

class KiwiiGuild extends Guild{
    constructor(client, data){
        super(client, data);

        this.i18n = new I18n({
            locales: ['en','fr'],
            directory: path.join(process.cwd(), 'locales'),
            objectNotation: true
          });
        this.i18n.setLocale('en');
    }
}

Structures.extend("Guild", () => KiwiiGuild);