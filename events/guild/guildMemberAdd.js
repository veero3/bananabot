const profilemodel = require('../../models/profieschema');
module.exports = async(client, discord, message) =>{
    let profile = new profilemodel({
        UserID = message.member.id,
        ServerID = message.guild.id,
        quantity = 0
        
    })
}