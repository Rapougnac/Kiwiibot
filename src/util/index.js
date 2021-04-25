const { readdirSync } = require('fs');

function getCommands() {
  let categories = [];

  readdirSync('./commands/').forEach((dir) => {
    const directories = readdirSync(`./commands/${dir}`).filter((file) =>
      file.endsWith('.js')
    );
    const value = [];
    const commands = directories.map((command) => {
      const file = require(`../commands/${dir}/${command}`);

      value.push({
        name: file.name ? file.name : 'No command name',
        description: file.description ? file.description : 'No description',
        aliases: file.aliases ? file.aliases : 'No aliases',
        category: file.category ? file.category : 'No category',
        utilisation: file.utilisation ? file.utilisation : 'No utilisation',
      });
    });

    let data = new Object();

    data = {
      name: dir.toUpperCase(),
      value,
    };

    categories.push(data);
  });
  return categories;
}

module.exports = { getCommands };
