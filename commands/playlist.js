const profilemodel = require('../models/profieschema');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
module.exports = {
    name: "pl",
    aliases: ["pladd", "plrm"],
    //description: "check and add songs to playlist",
    async execute(client, message, args, cmd, Discord, profileData) {
      let song={};
        if (cmd === 'pladd'){
            message.channel.send('hi');
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url, is_live: song_info.videoDetails.islive, thumb: song_info.videoDetails.thumbnails[0].url, time: song_info.videoDetails.lengthSeconds}
                songtime = song.time+` Seconds`;
            } 
            else {
                //If there was no link, use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return video_result.all[0];
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url, time:video.duration, thumb:video.thumbnail, is_live: video.islive}
                    songtime=song.time; 
                } else {
                    return message.channel.send('Error finding video.');
                }
            }
            await profilemodel.findOneAndUpdate({
                UserID: message.author.id,
            }, {
                $push:{
                songname: song.title,
                songurl: song.url},});
                message.channel.send(`Added ${song.title} to Your Playlist`)
            }


            if (cmd === 'plrm'){
                message.channel.send('hi');
                if (ytdl.validateURL(args[0])) {
                    const song_info = await ytdl.getInfo(args[0]);
                    song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url, is_live: song_info.videoDetails.islive, thumb: song_info.videoDetails.thumbnails[0].url, time: song_info.videoDetails.lengthSeconds}
                    songtime = song.time+` Seconds`;
                } 
                else {
                    //If there was no link, use keywords to search for a video. Set the song object to have two keys. Title and URl.
                    const video_finder = async (query) =>{
                        const video_result = await ytSearch(query);
                        return video_result.all[0];
                    }
    
                    const video = await video_finder(args.join(' '));
                    if (video){
                        song = { title: video.title, url: video.url, time:video.duration, thumb:video.thumbnail, is_live: video.islive}
                        songtime=song.time; 
                    } else {
                        return message.channel.send('Error finding video.');
                    }
                }
                await profilemodel.findOneAndUpdate({
                    UserID: message.author.id,
                }, {
                    $pull:{
                    songname: song.title,
                    songurl: song.url},});
                    message.channel.send(`Removed ${song.title} from Your Playlist`)
                }
            if (cmd === 'pl'){
                let i = 0
                let k = 0
                await profilemodel.findOne({UserID: message.author.id});
               const emb = new Discord.MessageEmbed()
            
                   .setColor('RANDOM')
                   .setTitle('**Your Playlist**')
                   .setTimestamp()
                   .setFooter(message.guild.name); 
               for(i in profileData.songname){                      
                   emb.addField(k+1, profileData.songname[i])
                   k++;
                   }
                   i++;
               
               message.channel.send(emb); 
            }
        
    },
  };