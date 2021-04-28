const Discord = module.require('discord.js');
const moment = require('moment');

module.exports = {
    name:'userinfo',
    aliases:['ui'],
    async execute (client, message, args, cmd, Discord){

    let user = message.mentions.users.first() || message.author;

    const joinDiscord = moment(user.createdAt).format('llll');
    const joinServer = moment(user.joinedAt).format('llll');
    let embed = new Discord.MessageEmbed()
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
        .setDescription(`${user}`)
        .setColor(`RANDOM`)
        .setThumbnail(`${user.displayAvatarURL()}`)
        .addField('Joined at:', `${moment.utc(user.joinedAt).format('Do [of] MMMM, YYYY')}`, true)
        .addField('Created at:', `${moment.utc(user.createdAt).format(' Do [of] MMMM, YYYY')}`, true)
        .addField('Status:', user.presence.status.charAt(0).toUpperCase() + user.presence.status.slice(1), true)
        .setFooter(`ID: ${user.id}`)
        .setTimestamp();

    message.channel.send(embed);
    }
}



// module.exports={
//     name: 'userinfo',
//     aliases: ['ui'],
//     execute(client, message, args, cmd, Discord){
//         let targ=message.mentions.users.first();
//         if(!targ){
//             targ=message.guild.members.cache.find(member => member.id === args[0]);
//         }
//         if(!targ && !args[0])
//         {
//             return message.channel.send(`You didnt mention anyone`)
//         }
//         let disc = new Discord.MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('User Info')
//             .addFields(
//                 {name: `UserID`, value: `${targ.id}`},
//                 {name: `Created On`, value: `${targ.createdAt}`},
//                 {name: `Joined on`, value: `${targ.joinedAt}`},
//             )
//             .setThumbnail(targ.displayAvatarURL())
//             .setTimestamp()
//             .setFooter(message.guild.name);
//             message.channel.send(disc);
//     }
// }