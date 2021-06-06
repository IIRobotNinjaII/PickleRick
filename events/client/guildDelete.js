const ServerModels = require('../../models/guildInfoSchema')
const ExtraServerInfo = require('../../models/extraguildInfoSchema')
const LevelInfo = require('../../models/XPlevelSchema')
const ReactionRoles = require('../../models/roleInfoSchema')
const {deleteExtraInfo} = require('../client/ready')

module.exports = async(Discord,client,guild) =>{
    await ServerModels.deleteMany({serverID : guild.id});
    await ExtraServerInfo.deleteMany({serverID : guild.id});
    await LevelInfo.deleteMany({serverID : guild.id});
    await ReactionRoles.deleteMany({serverID : guild.id});
    deleteExtraInfo(guild.id);
}

