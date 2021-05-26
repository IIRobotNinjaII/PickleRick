const ServerModels = require('../../models/guildInfoSchema')

module.exports = async(Discord,client,guild) =>{
    let profile = await ServerModels.create({
        serverId : guild.id,
    });
    profile.save();
}