const { MessageEmbed } = require('discord.js');

function stringifyPropsInOrder(obj) {
    var keys = Object.keys(obj).sort();
    var output = [], prop;
    for (var i = 0; i < keys.length; i++) {
        prop = keys[i];
        output.push(prop);
        output.push(obj[prop]);
    }
    return JSON.stringify(output);
}

module.exports = async (client, oldChannel, newChannel) => {



    if(stringifyPropsInOrder(newChannel)!=stringifyPropsInOrder(oldChannel)){
        const fetchGuildAuditLogs = await oldChannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_UPDATE'
        });
    
        const { executor }= fetchGuildAuditLogs.entries.first();
        let oldCategory = oldChannel.parent;
        let newCategory = newChannel.parent;
        let guildsChannel = newChannel.guild;
        if (!newCategory) newCategory = 'None';
        //if (!guildsChannel || !guildsChannel.available) return;
    
        let types = {
            text: 'Text Channel',
            voice: 'Voice Channel',
            category: "Category Channel",
            null: 'None',
        };
        const embed = new MessageEmbed()
            .setAuthor(`Modification d'un salon`)
            .setTitle(`Nom du salon:`)
            .setColor('YELLOW')
            .setDescription(`${newChannel}\n**Nom du salon avant**: ${oldChannel.name}\n**Nom du salon maintenant**: ${newChannel.name}`)
            .addField('**Type de channel**:', types[newChannel.type])
            .addField('**ID**:', newChannel.id)
            .addField('**NSFW avant**:', oldChannel.nsfw ? `Yes` : 'No')
            .addField('**NSFW après**:', newChannel.nsfw ? `Yes` : 'No')
            .addField("**Channel category**", newCategory)
            .setTimestamp()
            .setFooter(executor.username, executor.displayAvatarURL())
        await newChannel.guild.channels.cache.get('806129974011887706').send(embed);
    
    }

  
};