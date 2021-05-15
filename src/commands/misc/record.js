const fs = require("fs");
const { MessageAttachment, MessageEmbed } = require('discord.js');
const ffmpeg = require.resolve("ffmpeg-static/ffmpeg.exe");
// FIXME: Fix record
let exec = require('child_process').exec, child;
module.exports = {
    name: 'record',
    aliases: [],
    description: 'Record in the voice channel',
    category: 'Misc',
    utilisation: '{prefix}record',
    async execute(client, message, args) {
        if (message.member.id === message.author.id) {

            const voicechannel = message.member.voice.channel;
            if (!voicechannel) return message.channel.send("Please join a voice channel first!");

            const connection = await message.member.voice.channel.join();
            const receiver = connection.receiver.createStream(message.member, {
                mode: "pcm",
                end: "silence"
            });

            const writer = receiver.pipe(fs.createWriteStream(`./audio/record.pcm`));
            writer.on("finish", () => {
                child = exec(`${ffmpeg} -f s16le -ar 44.1k -ac 2 -y -i ./audio/record.pcm ./audio/record.mp3`,
                    function (error, stdout, stderr) {
                        //console.log('stdout: ' + stdout);
                        //console.log('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                    });
                child.on('exit', function () {
                    const attachment = new MessageAttachment(`./audio/record.mp3`);
                    message.member.voice.channel.leave();
                    message.channel.send("Finished writing audio");
                    message.channel.send(attachment)
                })



            });
        } else {
            message.channel.send('I can\'t access to your id')
        }
    },
};
