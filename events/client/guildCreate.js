const ServerModels = require('../../models/guildInfoSchema')

module.exports = async(client,discord,guild) =>{
    let profile = await ServerModels.create({
        serverId : guild.id,
    });
    profile.save();
}