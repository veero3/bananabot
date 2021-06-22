const { DiscordTogether } = require('discord-together');
module.exports={
    name: 'kill',
    aliases: ['die', 'restart', 'youtube', 'chess'],
    execute(client, message, args, cmd, Discord){
       if (cmd==='youtube'){
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
    return message.channel.send(`${invite.code}`);
});
       }
        
    }
}
