const profilemodel = require('../../models/profieschema');
module.exports = async(client, discord, member) =>{
    let profile = new profilemodel({
        UserID = member.id,
        ServerID = member.guild.id,
        quantity = 0
        
    })
}