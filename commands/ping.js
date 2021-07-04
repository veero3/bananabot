module.exports = {
    name: 'ping',
    execute(client, message, args, Discord){
        message.channel.send('pinging').then(sent =>{sent.edit(`Pong!!!\n ${sent.createdTimestamp - message.createdTimestamp}ms`)});
      
        



    }
}
