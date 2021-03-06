const {insertExtraInfo} = require('../../events/client/ready')
module.exports = {
    name : 'set_reaction',
    description : 'Adds emojis to all images sent on a channel',
    permissions : ["MANAGE_GUILD"],
    async execute(client,message,args,Discord,serverData,extrainfo){

        const filter = m => m.author.id === message.author.id;
        
        const collector = new Discord.MessageCollector(message.channel,filter,{
            max:1,
            time : 1000 * 60,
        })

        message.channel.send("Tag the required channels : ");

        collector.on('end',async(collected) =>{
            if(collected.size >0){
                if(collected.first().mentions.channels.size > 0){
                    collected.first().mentions.channels.forEach(val =>{
                        if(!extrainfo.reactionID.includes(val.id))
                            extrainfo.reactionID.push(val.id);
                        else{
                            message.channel.send(`<#${val.id}> was already added before.`)
                        }
                    })
                    await extrainfo.save();
                    insertExtraInfo(message.guild.id,extrainfo);
                    message.channel.send("Saved Successfully, Have a nice day :)")
                }
                else{
                    message.channel.send("You didn't tag any channels");
                }
            }
            else{
                message.channel.send("Request timed out");
            }
        })
    }
}