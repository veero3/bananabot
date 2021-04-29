module.exports={
    name: 'kill',
    aliases: ['die', 'restart'],
    execute(client, message, args, cmd, Discord){
        process.exit();
    }
}
