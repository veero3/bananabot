module.exports = {
    name: 'ping',
    execute(client, message, args, Discord){
        message.channel.send('pong!');



    }
}