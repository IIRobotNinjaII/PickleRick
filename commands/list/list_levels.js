const LevelInfo = require('../../models/XPlevelSchema')
module.exports = {
    name : 'list_levels',
    description : 'Lists all XP level rewards',
    permissions : ["MANAGE_GUILD"],
    async execute(client,message,args,Discord,serverData,extrainfo){
        let levelDatas = await LevelInfo.find({serverID:message.guild.id}).sort({level : 1});
        if(levelDatas){
            var counter = 0;
            let embeds = [];
            for(const level of levelDatas){
                if(!embeds[Math.floor(counter/25)]){
                    const embed = new Discord.MessageEmbed()
                    .setTitle('XP Level Rewards')
                    .setDescription(`Rank Up Channel - <#${extrainfo.rankID}>`)
                    .setColor(9245649);
                    embeds.push(embed);
                }
                embeds[Math.floor(counter/25)].addField(`${counter+1} - ${level.nickname}`,`Role - <@&${level.roleID}>\nRank - ${level.level}\nMessage - ${level.message}`,true);
                counter++;
            }
            for(const embed of embeds){
                await message.channel.send(embed);
            }
        }else{
            message.channel.send("No XP role rewards were found , add a XP role reward by typing `&add_level`.")
        }
    }
}