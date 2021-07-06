const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});

client.commands = new Discord.Collection();

client.events = new Discord.Collection();
const { DiscordTogether } = require('discord-together');


client.discordTogether = new DiscordTogether(client);


['event_handler', 'command_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.token);


