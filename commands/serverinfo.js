const moment = require('moment');
module.exports={
    name: 'serverinfo',
    aliases: 'si',
    execute(client, message, args, cmd, Discord){
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        let disc = new Discord.MessageEmbed()
        .setAuthor(message.guild.name)
        .setColor(`RANDOM`)
        .setThumbnail(`${message.guild.iconURL()}`)
        .addField('Created at:', `${moment.utc(message.guild.createdAt).format(' Do [of] MMMM, YYYY')}`, true)
        .addField('Onwer:', `${message.guild.owner}`, true)
        .addField('Onwer ID:', `${message.guild.ownerID}`, true)
        .addField('Total Members:', `${message.guild.memberCount}`, true)
        .addField(`Roles:`, `${roles.length - 1}`, true) 
        .setFooter(`Guild ID: ${message.guild.id}`)
        .setTimestamp();
        message.channel.send(disc);
    }
}