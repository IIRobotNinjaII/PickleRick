const cooldowns = new Map();
require('dotenv').config();
const ServerModels = require('../../models/guildInfoSchema')
const ExtraServerInfo = require('../../models/extraguildInfoSchema')
const {getExtraInfo} = require('../client/ready')
const LevelInfo = require('../../models/XPlevelSchema')
module.exports = async(Discord , client , message) =>{
    
    if(message.channel.type === 'dm')
        return;

    let extrainfo = getExtraInfo(message.guild.id);

    const prefix = process.env.PREFIX;

    if(extrainfo.reactionID){
        if ((message.content.includes('https') || message. attachments. size > 0 || message.embeds.length !== 0) && extrainfo.reactionID.includes(message.channel.id)){
            message.react('⬆️');
            message.react('⬇️');
        }
    }

    if(extrainfo.rankID){
        if(message.content.startsWith('GG') && message.author.id == '408118511026831360' && message.channel.id == extrainfo.rankID){
            let broadcast = message.content.slice(0,message.content.length-1);
            broadcast = broadcast.split(' ')
            let ranks = parseInt(broadcast[8],10);
            let levelData = await LevelInfo.findOne({ serverID : message.guild.id , level : ranks});
            if(levelData){
                let user = message.mentions.users.first();
                try{
                    let member = message.guild.members.cache.get(user.id);
                    await member.roles.add(levelData.roleID);
                    await user.send(levelData.message);
                }catch{
                    console.log("missing perms");
                }
    
            }
            else{
                console.log('f');   
            }
        }
    }
    

    if(!message.content.startsWith(prefix) || message.author.bot) return


    try{
        serverData = await ServerModels.findOne({ serverID : message.guild.id});
        if(!serverData){
            let profile = await ServerModels.create({
                serverID : message.guild.id,
            });
            profile.save();
            serverData = profile;
        }
    }catch (err){
        console.log(err);
    }

    
    try{
        extrainfo = await ExtraServerInfo.findOne({serverID : message.guild.id});
        if(!extrainfo){
            let profile = await ExtraServerInfo.create({
                serverID : message.guild.id,
            });
            profile.save();
            extrainfo = profile;
        }
    }catch (err){
        console.log(err);
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);

    if(!command)
        return;
        
    const ValidPermissions = ["ADMINISTRATOR", "CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

    if(command.permissions){
        if(command.permissions.length){
            let invalid_perms =[];
            for(const perm of command.permissions){
                if(!ValidPermissions.includes(perm)){
                    return console.log(`Invalid Permissions ${perm}`);
                }
                if(!message.member.hasPermission(perm)){
                    invalid_perms.push(perm);
                }
            }
            if(invalid_perms.length){
                return message.reply("Sorry you don't have the perms to execute that.")
            }
        }
    }

    if(command.perms){
        if(command.perms){
            let invalid_perms =[];
            for(const perm of command.perms){
                if(!ValidPermissions.includes(perm)){
                    return console.log(`Invalid Permissions ${perm}`);
                }
                if(!message.guild.me.hasPermission(perm)){
                    invalid_perms.push(perm);
                }
            }
            if(invalid_perms.length){
                return message.reply(`Sorry the bot does't have the \`${invalid_perms}\` permission to execute that.`)
            }
        }
    }

    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name,new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = command.cooldown;

    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) /60000;

            return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`);
        }
    }

    time_stamps.set(message.author.id,current_time)
    setTimeout(()=> time_stamps.delete(message.author.id),cooldown_amount);

    try{
        command.execute(client,message,args,Discord,serverData,extrainfo);
    }catch(err){
        message.reply('There was an error with command execution, sorry please try again later');
        console.log(err);
    }

}