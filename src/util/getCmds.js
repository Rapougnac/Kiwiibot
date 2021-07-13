const glob = require('glob');
const Command = require('../struct/Command');
const getCommands = (client) => {
  let categs = [];
  const value = [];
  let files = glob.sync('src/commands' + '/**/*.js');
  if (client.config.discord.dev.active) {
    if (client.config.discord.dev.include_cmd.length) {
      for (const File of client.config.discord.dev.include_cmd) {
        files = files.filter((file) => file.endsWith(File));
      }
    }
    if (client.config.discord.dev.exclude_cmd.length) {
      for (const File of client.config.discord.dev.exclude_cmd) {
        files = files.filter((file) => !file.endsWith(File));
      }
    }
    // let dirs;
    // for (let i = 0; i < files.length; i++) {
    //   dirs = files[i].split('/').length;
    //   dirs <= 4 ? dirs = files[i].split('/')[2] : dirs = files[i].split('/')[3];
    //   //console.log(dirs);
    // }
    files.forEach((file) => {
      try {
        /**
         * @type {Command}
         */
        const command = new (require(`${process.cwd()}/${file}`))(client);
        if (!isConstructor(command)) {
          if (command instanceof Command) {
            value.push({
              name: command.help.name,
              description: command.help.description
                ? command.help.description
                : 'Not setted',
              aliases: command.config.aliases
                ? command.config.aliases
                : "There's no aliases setted!",
              utilisation: command.help.utilisation
                ? command.help.utilisation
                : "There's no avaliable usage!",
            });

            let data = {
              name: command.help.category
                ? command.help.category
                : 'Unspecified',
              value,
            };
            categs.push(data);
          }
        }
      } catch (e) {
        //
      }
    });
  }
  return categs;
};

module.exports = {
  getCommands,
};

function isConstructor(f) {
  try {
    new f();
  } catch (e) {
    if (e.message.indexOf('is not a constructor') >= 0) {
      return false;
    }
  }
  return true;
}
