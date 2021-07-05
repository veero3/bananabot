module.exports={
    name: 'youtube',
    aliases: ['chess', 'yt', 'poker', 'fishing', 'betrayal'],
    execute(client, message, args, cmd, Discord){
       
            if(message.member.voice.channel) {
                if ((cmd === 'yt')||(cmd === 'youtube')) {
                 client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                 return message.channel.send(`${invite.code}`);
                    });
                }
                if (cmd === 'poker') {
                    client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
                    return message.channel.send(`${invite.code}`);
                       });
                }
                if (cmd === 'chess') {
                    client.discordTogether.createTogetherCode(message.member.voice.channelID, 'chess').then(async invite => {
                    return message.channel.send(`${invite.code}`);
                       });
                   }
                if (cmd === 'fishing') {
                    client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
                    return message.channel.send(`${invite.code}`);
                       });
                   }
                   if (cmd === 'betrayal') {
                    client.discordTogether.createTogetherCode(message.member.voice.channelID, 'betrayal').then(async invite => {
                    return message.channel.send(`${invite.code}`);
                       });
                   }
            }
            else{
                message.channel.send('You need to be in a voice channel');
            };
        }
 }
