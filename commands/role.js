module.exports={
    name:'role',
    aliases: ['help role', 'roleadd', 'rolerem'],
     execute(client, message, args, cmd, Discord){
        let targ=message.mentions.users.first();
        let rolework=message.guild.roles.cache.find(role => role.name===args[0]);
        if(targ){
            targ=message.guild.members.cache.get(targ.id);
        }
        else if(!targ){
            targ=message.guild.members.cache.find(member => member.id === args[1]);
        }
        if(!message.guild.roles.cache.find(role => role.name === args[0])){
           return message.channel.send('you didnt provide a proper role').then(message.react('❌'));
        }
        if(!targ && !args[1]){
            return message.channel.send('You did not define a user to add or remove a role from').then(message.react('❌'));
        }
        if(!targ){
            return message.channel.send('You did not provide a proper user').then(message.react('❌'));

        }
        if(!args[0]){
            return message.channel.send('You did not define a role to add or remove from a user').then(message.react('❌'));
        }
       
        
        if(cmd ==='roleadd'){
            if(targ.roles.cache.has(rolework.id)){
                message.channel.send(`${targ} already has this role`);
            }
            else{
                targ.roles.add(rolework.id);
                message.channel.send(`added** ${args[0]}** to ${targ}`).then(message.react('✅'));
            }
        }
        else if(cmd === 'rolerem'){
            if(!targ.roles.cache.has(rolework.id)){
                message.channel.send(`${targ} did\'nt have this role`);
            }
            else{
                targ.roles.remove(rolework.id);
                message.channel.send(`removed** ${args[0]}** from ${targ}`).then(message.react('✅'));

            }
        }
        else if(cmd === 'role'){
            if(targ.roles.cache.has(rolework.id)){
                targ.roles.remove(rolework.id);
                message.channel.send(`removed** ${args[0]}** from ${targ}`).then(message.react('✅'));
            }
            else{
                targ.roles.add(rolework.id);
                message.channel.send(`added** ${args[0]}** to ${targ}`).then(message.react('✅'));

            }
        }
    }
}