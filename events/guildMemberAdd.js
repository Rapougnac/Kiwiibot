const Discord = require("discord.js");
const Canvas = require('canvas');

module.exports = async (member, client) => {
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');

        
        let fontSize = 70;

        do {
            
            ctx.font = `${fontSize -= 10}px sans-serif`;
            
        } while (ctx.measureText(text).width > canvas.width - 300);

        // Return the result to use in the actual canvas
        return ctx.font;
    };
    const channel = client.guild.channels.cache.find(ch => ch.name === "général");
    if (!channel) return;
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext(`2d`);
    const guild = client.guilds.cache.find(gu => gu.name === "TEST POUR TOUT ET RIEN");
    const memberCount = guild.memberCount;


    const background = await Canvas.loadImage(`../bannierew.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = `45px Calvert MT Std`;
    ctx.fillStyle = `#000000`;
    ctx.fillText('Bienvenue :', canvas.width / 2.7, canvas.height / 2.7);

    ctx.font = applyText(canvas, member.user.tag);
    ctx.fillStyle = `#ffffff`;
    ctx.fillText(/*member.user.tag*/member.displayName, canvas.width / 2.7, canvas.height / 1.7);

    ctx.font = '25px sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(`Nous sommes ${memberCount} \n sur le serveur`, canvas.width / 2.7, canvas.height / 1.25);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: `jpg` }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), './bannierew.png');

    channel.send(`Hey ${member} ! Bienvenue dans le serveur Discord d'Akane-Nightcore ! Merci d'avoir rejoint ce serveur, n'oublie pas de valider le règlement mais n'oublie surtout pas de t'amuser ! :Akanechan_happy: !`, attachment);
};