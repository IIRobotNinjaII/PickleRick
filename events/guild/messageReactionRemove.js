const ReactionRoles = require('../../models/roleInfoSchema')

module.exports = async(client,discord,reaction,user) =>{
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    let roledata = await ReactionRoles.findOne({serverID : reaction.message.guild.id , channelID : reaction.message.channel.id , messageID : reaction.message.id , reaction : reaction.emoji.name });
    if(roledata){
        try{
            await reaction.message.guild.members.cache.get(user.id).roles.remove(roledata.roleID)
        }catch{
            console.log('Error in removing role');
        }
    }

}