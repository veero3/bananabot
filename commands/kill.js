module.exports={
    name: 'kill',
    aliases: ['die', 'restart'],
    execute(client, message, args, cmd, Discord){
        message.channel.send('restarting')
        process.exit();
    }
}
