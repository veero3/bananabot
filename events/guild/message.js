const profilemodel = require('../../models/profieschema');
const profilemod = require('../../models/muterole')
module.exports = async(Discord, client, message) =>{
    const prefix = 'bb ';
    if(!message.content.startsWith(prefix)||message.author.bot)return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd)||client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    let profileData;
    let profilData;
 
  profileData = await profilemodel.findOne({ UserID: message.author.id });
    if (!profileData) {
      let profile = await profilemodel.create({
        UserID: message.author.id,
        username: message.author.username,
        songname: []
      });
      profile.save();
    }
   profilData = await profilemod.findOne({ serverID: message.guild.id });
    if (!profilData) {
      let profile = await profilemod.create({
        serverID: message.guild.id,
        mute: "00000000000000000"
      });
      profile.save();
    }
    if(command){
       command.execute(client, message, args, cmd, Discord, profileData,profilData);
    }
}
