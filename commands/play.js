const profilemodel = require("../models/profieschema");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const Discord = require("discord.js");
var songtime = 0;
//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();

module.exports = {
  name: "play",
  aliases: [
    "skip",
    "stop",
    "p",
    "leave",
    "queue",
    "q",
    "l",
    "s",
    "pause",
    "seek",
    "plp",
  ],
  async execute(client, message, args, cmd, Discord, profileData) {
    let loaded = false;

    //Checking for the voicechannel and permissions
    const voice_channel = message.member.voice.channel;
    if (!voice_channel)
      return message.channel.send(
        "You need to be in a channel to execute this command!"
      );
    const permissions = voice_channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send("You dont have the correct permissins");
    if (!permissions.has("SPEAK"))
      return message.channel.send("You dont have the correct permissins");

    //server queue, getting this server queue from the global queue.
    let server_queue = queue.get(message.guild.id);

    if (cmd === "play" || cmd === "p") {
      if (!args.length)
        return message.channel.send("You need to send the second argument!");
      let song = {};

      //If the first argument is a link. Set the song object to have two keys. Title and URl.
      if (ytdl.validateURL(args[0])) {
        const song_info = await ytdl.getInfo(args[0]);
        song = {
          title: song_info.videoDetails.title,
          url: song_info.videoDetails.video_url,
          is_live: song_info.videoDetails.isLive,
          thumb: song_info.videoDetails.thumbnails[0].url,
          time: song_info.videoDetails.lengthSeconds,
        };
        songtime = song.time + ` Seconds`;
      } else {
        //If there was no link, use keywords to search for a video. Set the song object to have two keys. Title and URl.
        const video_finder = async (query) => {
          const video_result = await ytSearch(query);
          return video_result.all[0];
        };

        const video = await video_finder(args.join(" "));
        if (video) {
          var type;
          if (video.type === "live") type = true;
          else type = false;
          song = {
            title: video.title,
            url: video.url,
            time: video.duration,
            thumb: video.thumbnail,
            is_live: type,
          };
          songtime = song.time;
        } else {
          return message.channel.send("Error finding video.");
        }
      }

      //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
      if (!server_queue || !message.guild.voice.channel) {
        const queue_constructor = {
          voice_channel: voice_channel,
          text_channel: message.channel,
          connection: null,
          songs: [],
        };

        //Add our key and value pair into the global queue. We then use this to get our server queue.
        queue.set(message.guild.id, queue_constructor);
        queue_constructor.songs.push(song);

        //Establish a connection and play the song with the vide_player function.
        try {
          const connection = await voice_channel.join();
          queue_constructor.connection = connection;
          video_player(message.guild, queue_constructor.songs[0]);
          connection.voice.setSelfDeaf(true);
        } catch (err) {
          queue.delete(message.guild.id);
          console.log(err);
          message.channel.send("There was an error connecting!");
        }
      } else {
        server_queue.songs.push(song);
        let emb = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor("Added To Queue!!")
          .setTitle(song.title)
          .addFields(
            { name: `Channel`, value: `${voice_channel.name}` },
            { name: `Length`, value: !song.is_live ? `${songtime}` : `live` }
          )
          .setThumbnail(song.thumb)
          .setColor("RANDOM")
          .setTimestamp()
          .setFooter(message.guild.name);

        return message.channel.send(emb).then(message.react("????"));
      }
    } else if (cmd === "plp") {
      // if (!args.length) return message.channel.send('You need to send the second argument!');
      let song = {};
      let i = 0;
      if (!profileData.songname[0]) {
        return message.channel.send("No songs in your Playlist");
      }
      message.channel.send("sure! (this might take a minute!!)");

      const connection = await voice_channel.join();
      x = 0;
      y = 0;
      z = 0;
      temp = [];
      for (i in profileData.songname) {
        if (!args[0]) {
          x = i;
        } else if (args[0] == "shuffle") {
          while (true) {
            x = Math.floor(Math.random() * profileData.songname.length);
            while (y <= temp.length) {
              if (x == temp[y]) {
                z = z + 1;
                break;
              }
              y = y + 1;
            }
            if (z >= 1) {
              x = Math.floor(Math.random() * profileData.songname.length);
              y = 0;
              z = 0;
              continue;
            }
            temp[i] = x;
            y = 0;
            break;
          }
        }
        // // while (y <= temp.length) {
        // //   x = Math.floor(Math.random() * profileData.songname.length);
        // //   if (x == temp[y]) {
        // //     y = y + 1;
        // //     continue;
        // //   } else {
        // //     temp[z] = x;
        // //     y = 0;
        // //     z = z + 1;
        // //     break;
        // //   }
        // //}
        // // temp[y] = x;
        // // y = y + 1;
        // // break;

        //If the first argument is a link. Set the song object to have two keys. Title and URl
        const video_finder = async (query) => {
          const video_result = await ytSearch(profileData.songname[x]);
          return video_result.all[0];
        };

        const video = await video_finder(args.join(" "));
        if (video) {
          var type;
          if (video.type == "live") type = true;
          else type = false;
          song = {
            title: video.title,
            url: video.url,
            time: video.duration,
            thumb: video.thumbnail,
            is_live: type,
          };
          songtime = song.time;
        } else {
          return message.channel.send("Error finding video.");
        }
        server_queue = queue.get(message.guild.id);
        //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
        if (!server_queue || !message.guild.voice.channel) {
          const queue_constructor = {
            voice_channel: voice_channel,
            text_channel: message.channel,
            connection: null,
            songs: [],
          };

          //Add our key and value pair into the global queue. We then use this to get our server queue.
          queue.set(message.guild.id, queue_constructor);
          queue_constructor.songs.push(song);

          //Establish a connection and play the song with the vide_player function.
          try {
            queue_constructor.connection = connection;
            video_player(message.guild, queue_constructor.songs[0]);
            connection.voice.setSelfDeaf(true);
          } catch (err) {
            queue.delete(message.guild.id);
            message.channel.send("There was an error connecting!");
          }
          if (client.voice.connections.size == 0) {
            return;
          }
        } else {
          server_queue.songs.push(song);
        }
      }

      message.channel
        .send("Your Playlist added to Queue!")
        .then(message.react("????"));
    } else if (cmd === "skip" || cmd === "s") skip_song(message, server_queue);
    else if (cmd === "stop" || cmd === "leave" || cmd === "l")
      stop_song(message, server_queue);
    else if (cmd === `pause`) pause(message, server_queue);
    //else if(cmd === 'resume')resume(message, server_queue);
    else if (cmd === "queue" || cmd === "q") que(message, server_queue);
    else if (cmd === "seek") {
      const queue_constructor = {
        voice_channel: voice_channel,
        text_channel: message.channel,
        connection: null,
        songs: [server_queue.songs[0]],
      };

      const connection = await voice_channel.join();
      queue_constructor.connection = connection;
      seek(
        message.guild,
        queue_constructor.songs[0],
        args,
        message,
        server_queue
      );
    }
  },
};

const video_player = async (guild, song) => {
  const song_queue = queue.get(guild.id);

  //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
  if (!song) {
    song_queue.voice_channel.leave();
    queue.delete(guild.id);
    return;
  }

  if (song.is_live) {
    const stream = ytdl(song.url, { liveBuffer: 500 });
    song_queue.connection
      .play(stream, { seek: 0, volume: 0.5 })
      .on("finish", () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
      });
    console.log("live");
  } else {
    const stream = ytdl(song.url, { filter: "audioonly" });
    song_queue.connection
      .play(stream, { seek: 0, volume: 0.5 })
      .on("finish", () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
      });
    console.log("not live");
  }
  // if (client.voice.connections.size == 0) {
  //   return;
  // }
  const embedd = new Discord.MessageEmbed()
    .setAuthor(`???? Now playing`)
    .setTitle(song.title)
    .setURL(song.url)
    .addFields(
      { name: `Channel`, value: `<#${guild.voice.channelID}>` },
      { name: `Length`, value: !song.is_live ? `${songtime}` : `live` }
    )
    .setThumbnail(song.thumb)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(guild.name);

  await song_queue.text_channel.send(embedd);
};
const pause = (message, server_queue) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You need to be in a channel to execute this command!"
    );
  if (!message.guild.voice.channel)
    return message.channel.send("i'm not playing anything");
  if (message.member.voice.channel != message.guild.voice.channel)
    return message.channel.send("The bot is playing in a different channel");

  server_queue.connection.dispatcher.pause();
  message.channel.send("Paused").then(message.react("???"));
};
// const resume = (message, server_queue)=>{
//     if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
//     if (!message.guild.voice.channel) return message.channel.send('i\'m not playing anything');
//     if (message.member.voice.channel != message.guild.voice.channel) return message.channel.send('The bot is playing in a different channel');

//     server_queue.connection.dispatcher.resume();
//     message.channel.send('Resuming').then(message.react ('????'))
// }

const skip_song = (message, server_queue) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You need to be in a channel to execute this command!"
    );
  if (!message.member.voice.channel)
    return message.channel.send("i'm not playing anything");
  if (message.member.voice.channel != message.guild.voice.channel)
    return message.channel.send("The bot is playing in a different channel");
  if (!server_queue) {
    return message.channel.send(`There are no songs in queue ????`);
  }
  server_queue.connection.dispatcher.end();
};

const stop_song = (message, server_queue) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You need to be in a channel to execute this command!"
    );
  if (!message.guild.voice.channel)
    return message.channel.send("i'm not playing anything");
  if (message.member.voice.channel != message.guild.voice.channel)
    return message.channel.send("The bot is playing in a different channel");
  server_queue.songs = [];
  server_queue.connection.dispatcher.end();
  message.guild.me.voice.channel.leave();
  const stopembed = new Discord.MessageEmbed()
    .setTitle(`Stopped Music!`)
    .setDescription(`Left <#${message.guild.voice.channelID}>`)
    .setFooter(message.guild)
    .setTimestamp();
  loaded = true;
  message.channel.send("Bye Bye :wave:", stopembed);
};
const que = (message, server_queue, song) => {
  if (server_queue) {
    const embe = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Now Playing!")
      .addField(
        server_queue.songs[0].title,
        songtime /*server_queue.songs[0].time*/
      );
    message.channel.send(embe);
    let i = 1;
    const emb = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("**Queue**")
      .setTimestamp()
      .setFooter(message.guild.name);
    for (song of server_queue.songs) {
      if (i == 1);
      else {
        emb.addField(song.title, songtime);
      }
      i++;
    }
    message.channel.send(emb);
  } else {
    message.channel.send("No Songs in queue");
  }
};

const seek = async (guild, song, args, message, server_queue) => {
  const seekamt = +args[0];
  if (
    !seekamt ||
    seekamt >= server_queue.songs[0].time.seconds ||
    seekamt < 0
  ) {
    return message.channel.send("please enter a valid time amount");
  }
  const song_queue = queue.get(guild.id);

  const stream = ytdl(song.url, { filter: "audioonly" });
  song_queue.connection
    .play(stream, { seek: args, volume: 0.5 })
    .on("finish", () => {
      song_queue.songs.shift();
      video_player(guild, song_queue.songs[0]);
    });
  message.channel.send(`seeking to ${seekamt}`).then(message.react("???"));
};
