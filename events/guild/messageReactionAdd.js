const ReactionRoles = require('../../models/roleInfoSchema')

module.exports = async(Discord,client,reaction,user) =>{
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    let roledata = await ReactionRoles.findOne({serverID : reaction.message.guild.id , channelID : reaction.message.channel.id , messageID : reaction.message.id , reaction : reaction.emoji.name });
    if(roledata){
        try{
            let rolename = await reaction.message.guild.roles.cache.get(roledata.roleID).name;
            await reaction.message.guild.members.cache.get(user.id).roles.add(roledata.roleID);
            const role_add = new Discord.MessageEmbed()
                .setColor('#791cdf')
                .addField('Role Added',`You have been added to ${rolename}`);
            await reaction.message.guild.members.cache.get(user.id).send(role_add)
        }catch(Err){
            console.log('Error in adding role');
        }
    }

}