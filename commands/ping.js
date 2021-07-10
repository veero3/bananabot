module.exports = {
    name: 'ping',
    execute(client, message, args, Discord){
        message.channel.send('pinging').then(sent =>{sent.edit(`Pong!!!\`\`\` ${sent.createdTimestamp - message.createdTimestamp}ms\`\`\``)});
      
        



    }
}
