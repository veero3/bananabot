
module.exports={
    name: 'ban',
    aliases: ['unban', 'kick'],
    execute(client, message, args, cmd, Discord){
        let targ=message.mentions.users.first();
        if(targ){
            targ=message.guild.members.cache.get(targ.id);
        }
        else if(!targ){
            targ=message.guild.members.cache.find(member => member.id === args[0]);
        }
        if(!targ && !args[0]){
            return message.channel.send('You did not provide a proper user').then(message.react('❌'));
        }
        if(cmd === 'ban'){
            if(!targ){
                return message.channel.send('You did not provide a proper user').then(message.react('❌'));
            }
            if(message.member.hasPermission('BAN_MEMBERS')||message.member.hasPermission('ADMINISTRATOR')){
                if(targ.id != 835412690428100648){
                    targ.ban({reason: `${args[1]}`});
                    message.channel.send(`${targ} has been banned`)
                 }
                else{
                    message.channel.send(`i can\'t ban myself`)
                }
            }
            else{
                message.channel.send('You don\'t have permissions to ban anyone');
            }
        } 
        else if(cmd ==='unban'){
            if(message.member.hasPermission('BAN_MEMBERS')||message.member.hasPermission('ADMINISTRATOR')){
                message.guild.fetchBans().then(bans=> {
                let userid=args[0];
                if(bans.size == 0) return message.channel.send(`no bans found`)
                let bUser = bans.find(b => b.user.id == userid)
                if(!bUser) return message.channel.send(`this user is not banned`)
                message.guild.members.unban(bUser.user)
                message.channel.send(`${bUser.user} has been unbanned`)
                })
            }
            else{
                message.channel.send('You don\'t have permissions to unban anyone');
            }
        }
        if(cmd === 'kick'){
            if(!targ){
                return message.channel.send('You did not provide a proper user').then(message.react('❌'));
            }
            if(message.member.hasPermission('KICK_MEMBERS')||message.member.hasPermission('ADMINISTRATOR')){
                targ.kick();
                message.channel.send(`${targ} has been kicked`)
            }
            else{
                message.channel.send('You don\'t have permissions to kick anyone');
            }  
        } 
    }
}