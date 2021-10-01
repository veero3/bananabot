const ms =require('ms');
module.exports = {

    name: 'mute',
    aliases: ['unmute'],
    execute(client, message, args, cmd, Discord){
       if(cmd === 'mute'){
        const target = message.mentions.users.first();
        if(!target && !args[0]){
            message.channel.send('Could not find user');
        }
        else if(message.member.hasPermission('BAN_MEMBERS')||message.member.hasPermission('ADMINISTRATOR')){
            let muterole = message.guild.roles.cache.find(role => role.name === 'muted')||message.guild.roles.cache.find(role => role.name === 'Muted');
            if(target){ 
                let targ = message.guild.members.cache.get(target.id);
                targ.roles.add(muterole.id);       
                if(args[1]){
                    message.channel.send(`<@${targ.user.id}> has been muted for ${args[1]}`);
                    setTimeout(function() {
                        targ.roles.remove(muterole.id);                   
                    }, ms(args[1]));                
                    
                }
                else message.channel.send(`<@${targ.user.id}> has been muted`);
                
            }
        
            else if(args[0]){
                let targ = message.guild.members.cache.find(member => member.id === args[0]);
                targ.roles.add(muterole.id);            
                if(args[1]){
                    message.channel.send(`<@${targ.user.id}> has been muted for ${args[1]}`);
                    setTimeout(function() {
                        targ.roles.remove(muterole.id);                   
                    }, ms(args[1]));                
                    
                }
                else message.channel.send(`<@${targ.user.id}> has been muted`);
            }
            else message.channel.send('No such user found');
        }
    }
    else if(cmd === 'unmute'){
        const target = message.mentions.users.first();
        if(!target && !args[0])message.channel.send('Could not find user');
        else if(message.member.hasPermission('BAN_MEMBERS')||message.member.hasPermission('ADMINISTRATOR')){
        let muterole = message.guild.roles.cache.find(role => role.name === 'muted')||message.guild.roles.cache.find(role => role.name === 'Muted');
        if(target){ 
            let targ = message.guild.members.cache.get(target.id);
            targ.roles.remove(muterole.id);       
            message.channel.send(`<@${targ.user.id}> has been unmuted`);
                
            }
        
        else if(args[0]){
            let targ = message.guild.members.cache.find(member => member.id === args[0]);
            targ.roles.remove(muterole.id);       
            message.channel.send(`<@${targ.user.id}> has been unmuted`);
        }
        else message.channel.send('No such user found');
    }
    }
    }
       
       
} 