// const { APIMessage, Structures, Message } = require('discord.js');
// class ExtAPIMessage extends APIMessage {
//   resolveData() {
//     if (this.data) return this;
//     super.resolveData();
//     if ((this.options.allowedMentions || {}).repliedUser !== undefined) {
//       if (this.data.allowed_mentions === undefined)
//         this.data.allowed_mentions = {};
//       Object.assign(this.data.allowed_mentions, {
//         replied_user: this.options.allowedMentions.repliedUser,
//       });
//       delete this.options.allowedMentions.repliedUser;
//     }
//     if (this.options.replyTo !== undefined) {
//       Object.assign(this.data, {
//         message_reference: { message_id: this.options.replyTo.id },
//       });
//     }
//     return this;
//   }
// }
// class ExtMessage extends Message {
//   // constructor(client, data, channel) {
//   //   super(client, data, channel);
//   //   if(channel.type === 'dm') {
//   //     this.guild = {
//   //       i18n: new I18n({
//   //         locales: ['en', 'fr'],
//   //         directory: path.join(process.cwd(), 'locales'),
//   //         objectNotation: true,
//   //       }),
//   //     }
//   //     this.guild.i18n.setLocale('en');
//   //   }
//   // }
  
//   inlineReply(content, options) {
//     return this.channel.send(
//       ExtAPIMessage.create(this, content, options, {
//         replyTo: this,
//       }).resolveData()
//     );
//   }

//   edit(content, options) {
//     return super.edit(
//       ExtAPIMessage.create(this, content, options).resolveData()
//     );
//   }
// }

// Structures.extend("Message", () => ExtMessage);
