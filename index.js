const Discord = require('discord.js');
require('dotenv').config();
const mongoose = require('mongoose');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});

const disbut = require('discord.js-buttons')(client);

client.commands = new Discord.Collection();

client.events = new Discord.Collection();
const { DiscordTogether } = require('discord-together');


client.discordTogether = new DiscordTogether(client);


['event_handler', 'command_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(process.env.mongo_srv, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false
    }).then(()=>{
        console.log('connected to the data base')
    }).catch((err)=>{
        console.log(err)
    });
client.login(process.env.token);


