const disbut = require("discord.js-buttons")

module.exports={
    name: 'invite',
    execute(client, message, args, cmd, Discord){
        
        let btn = new disbut.MessageButton()
        .setStyle('url')
        .setLabel('BananaBot')
        .setID('server_invite')
        .setURL('https://discord.com/oauth2/authorize?client_id=835412690428100648&scope=bot&permissions=334950271')
        message.channel.send('Click the button to invite BananaBot', btn);
    }    }