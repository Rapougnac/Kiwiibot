const fs = require("fs");
const Discord = require('discord.js');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;
let exec = require('child_process').exec, child;
module.exports = {
    name: 'record',
    aliases: [],
    description: 'Record in the voice channel',
    category: 'Misc',
    utilisation: '{prefix}record',
    async execute(client, message, args) {

        const voicechannel = message.member.voice.channel;
        if (!voicechannel) return message.channel.send("Please join a voice channel first!");

        const connection = await message.member.voice.channel.join();
        const receiver = connection.receiver.createStream(message.member, {
            mode: "pcm",
            end: "silence"
        });

        const writer = receiver.pipe(fs.createWriteStream(`./audio/${message.author.id}.pcm`));
        writer.on("finish", () => {
            child = exec(`${ffmpeg} -f s16le -ar 44.1k -ac 2 -y -i ./audio/${message.author.id}.pcm ./audio/${message.author.id}.mp3`,
            function (error, stdout, stderr) {
                //console.log('stdout: ' + stdout);
                //console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
            
            message.member.voice.channel.leave();
            message.channel.send("Finished writing audio");
        });
    }
}
