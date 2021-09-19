module.exports = {
    name: 'say',
    execute(client, message, args, Discord){
        message.channel.send(message.content.slice(7))
    }
}