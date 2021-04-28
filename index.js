const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});

client.commands = new Discord.Collection();

client.events = new Discord.Collection();


['event_handler', 'command_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.token);


/*const fs = require('fs');



const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandfiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('BOOTED UP');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix)||message.author.bot)return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }else if(command == 'youtube'){
        client.commands.get('yt').execute(message, args);
    }else if(command == 'embed'){
        client.commands.get('help').execute(message, args, Discord);
    }else if(command == 'mute'){
        client.commands.get('mute').execute(message, args);
    }else if(command == 'unmute'){
        client.commands.get('unmute').execute(message, args);
    }
});*/