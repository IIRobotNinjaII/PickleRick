const RoleInfo = require('../../models/roleInfoSchema')
module.exports = {
    name : 'list_roles',
    description : 'Lists all reaction roles',
    permissions : ["MANAGE_GUILD"],
    async execute(client,message,args,Discord){
        let roleDatas = await RoleInfo.find({serverID:message.guild.id});
        if(roleDatas){
            var counter = 0;
            let embeds = [];
            for(const role of roleDatas){
                if(!embeds[Math.floor(counter/25)]){
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Reaction Roles')
                    .setDescription(`Page  ${Math.floor(counter/25) + 1}`)
                    .setColor(704089);
                    embeds.push(embed);
                }
                embeds[Math.floor(counter/25)].addField(`${counter+1} - ${role.nickname}`,`Channel - <#${role.channelID}>\nMessageID - ${role.messageID}\nRole - <@&${role.roleID}>\nEmoji - ${role.reaction}\n[Go to message!](https://discord.com/channels/${message.guild.id}/${role.channelID}/${role.messageID})`,true);
                counter++;
            }
            for(const embed of embeds){
                await message.channel.send(embed);
            }
        }else{
            message.channel.send("No reaction roles were found , add a reaction role by typing `$add_role`.")
        }
    }
}