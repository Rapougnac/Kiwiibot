// const glob = require("glob")
// const consoleUtil = require("../util/console")
// const config = require("../../config.json");
// //Function for get all files into directory
// let recursive_readdir = function (src, callback) {
//   glob(src + "/**/*", callback)
// }
// require("../commands")
// require("../../src/commands")
//Load the commands
// function loadCommands() {
//   recursive_readdir("./src/commands", function (err, files) {
//     if (err) {
//       consoleUtil.error("Error", err);
//     } else {
//       files = files.filter((file) => file.endsWith(".js"));
//       if (config.discord.dev.active) {
//         if (config.discord.dev.include_cmd.length) {
//           files = files.filter((file) =>
//             file.endsWith(config.discord.dev.include_cmd)
//           );
//         };
//         if (config.discord.dev.exclude_cmd.length) {
//           files = files.filter(
//             (file) => !file.endsWith(config.discord.dev.exclude_cmd)
//           );
//         };
//       };
//       files.forEach((file) => {
//         const command = require(`./${file}`);
//         client.commands.set(command.name, command);
//         if (command.aliases) {
//           command.aliases.forEach((alias) => {
//             client.aliases.set(alias, command);
//           });
//         };
//       });
//       consoleUtil.success(`Loaded ${files.length} commands`);
//     };
//   });
// };

//module.exports = { loadCommands }
