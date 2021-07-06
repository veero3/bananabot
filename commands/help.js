module.exports ={

    name: 'help',
    aliases: ['h'],
    async execute(client, message, args, cmd, Discord){
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Help')
    //  .setURL('https://discord.js.org/')
    //  .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
    //  .setDescription('**Commands**\n\n```\nmute - mute a user\nunmute - unmute a user\nping - basic ping pong command\nplay - play a song\nskip - skip a song\nstop - stop playing and leave the channel\nqueue - check song queue\nrole - add or remove a role from a user\nroleadd - add a role to a user\nrolerem - remove a role from a user```')
    //  .setDescription(`**Commands**`)
        .addFields(
            {name:`**Moderation**`, value:`\`mute, unmute, kick, ban, unban\``},
            {name: `**Role Ulitiies**`, value:`\`role, roleadd, rolerem\``},
            {name: `**Music**`, value:`\`play, stop, skip, queue, leave, pause, resume\``},
            {name: `**Discord Together**`, value:`\`yt, chess, poker, fishing, betrayal\``},
            {name: `**Info**`, value:`\`userinfo, serverinfo\``}

        )
    //  .setThumbnail(message.guild.icon.link)
    //  .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp()
        .setFooter(message.guild.name);
        
        await message.channel.send(embed).then(message.react('✅'));

    }
}