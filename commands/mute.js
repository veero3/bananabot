const profilemod = require('../models/muterole');
const ms = require('ms');
module.exports = {

    name: 'mute',
    aliases: ['unmute', 'setmute'],
    async execute(client, message, args, cmd, Discord, profileData, profilData) {
        if (cmd === 'mute') {
            const target = message.mentions.users.first();
            if (!target && !args[0]) {
                message.channel.send('Could not find user');
            }
            else if (message.member.hasPermission('MANAGE_ROLES') || message.member.hasPermission('ADMINISTRATOR')) {
                if (!profilData.mute) {
                    return message.channel.send("Please set a mute role")
                }
                let muterole = profilData.mute
                if (target) {
                    let targ = message.guild.members.cache.get(target.id);
                    targ.roles.add(muterole);
                    if (args[1]) {
                        message.channel.send(`<@${targ.user.id}> has been muted for ${args[1]}`);
                        setTimeout(function () {
                            targ.roles.remove(muterole);
                        }, ms(args[1]));

                    }
                    else message.channel.send(`<@${targ.user.id}> has been muted`);

                }

                else if (args[0]) {
                    let targ = message.guild.members.cache.find(member => member.id === args[0]);
                    targ.roles.add(muterole);
                    if (args[1]) {
                        message.channel.send(`<@${targ.user.id}> has been muted for ${args[1]}`);
                        setTimeout(function () {
                            targ.roles.remove(muterole);
                        }, ms(args[1]));

                    }
                    else message.channel.send(`<@${targ.user.id}> has been muted`);
                }
                else message.channel.send('No such user found');
            }
            else {
                message.channel.send('You do not have permissions')
            }
        }
        else if (cmd === 'unmute') {
            const target = message.mentions.users.first();
            if (!target && !args[0]) message.channel.send('Could not find user');
            else if (message.member.hasPermission('MANAGE_ROLES') || message.member.hasPermission('ADMINISTRATOR')) {
                if (!profilData.mute) {
                    return message.channel.send("Please set a mute role")
                }
                let muterole = profilData.mute
                if (target) {
                    let targ = message.guild.members.cache.get(target.id);
                    targ.roles.remove(muterole);
                    message.channel.send(`<@${targ.user.id}> has been unmuted`);

                }

                else if (args[0]) {
                    let targ = message.guild.members.cache.find(member => member.id === args[0]);
                    targ.roles.remove(muterole);
                    message.channel.send(`<@${targ.user.id}> has been unmuted`);
                }
                else message.channel.send('No such user found');
            } else {
                message.channel.send('You do not have permissions')
            }
        }
        else if (cmd === 'setmute') {
            console.log(profilData)
            await profilemod.findOneAndUpdate({
                serverID: message.guild.id
            }, {
                mute: message.mentions.roles.first().id
            });
        }
    }


} 