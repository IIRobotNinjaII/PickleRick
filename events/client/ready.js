const ExtraServerInfo = require('../../models/extraguildInfoSchema')
require('dotenv').config();

const extra_infos_cache = new Map();


module.exports = async(Discord , client) =>{

    console.log("Bot is online")
    client.user.setActivity(`${process.env.PREFIX}help`);

    let extra_infos = await ExtraServerInfo.find({});

    for(const extra_info of extra_infos){
    
        extra_infos_cache.set(extra_info.serverID,extra_info);
    }
    
}

module.exports.getExtraInfo = (serverID) => {
    return extra_infos_cache.get(serverID);
}

module.exports.insertExtraInfo = (serverID , data) =>{
    return extra_infos_cache.set(serverID,data);
}

module.exports.deleteExtraInfo = (serverID) =>{
    return extra_infos_cache.delete(serverID);
}