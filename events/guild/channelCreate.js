const ServerModels = require('../../models/guildInfoSchema')

module.exports = async(Discord,client,channel) =>{
    if(channel.type === 'dm')
        return;
    try{
        serverData = await ServerModels.findOne({ serverID : channel.guild.id});
        if(!serverData){
            let profile = await ServerModels.create({
                serverID : channel.guild.id,
            });
            profile.save();
            serverData = profile;
        }
    }catch (err){
        console.log(err);
    }
    if(serverData.lock == 1 && serverData.memberID){
        try{
            channel.updateOverwrite(channel.guild.id,{VIEW_CHANNEL:false});
            channel.updateOverwrite(serverData.memberID,{VIEW_CHANNEL:true});
        }catch{
            console.log("Fault in channel overwrite");
        }
    }
}