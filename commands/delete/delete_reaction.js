const LevelInfo = require('../../models/XPlevelSchema')
module.exports = {
    name : 'delete_reaction',
    description : 'Remove channels from reaction list',
    permissions : ["ADMINISTRATOR","MANAGE_CHANNELS"],
    async execute(client,message,args,Discord,serverData,extrainfo){

        const filter = m => m.author.id === message.author.id;
        
        const collector = new Discord.MessageCollector(message.channel,filter,{
            max:1,
            time : 1000 * 60,
        })
        
        message.channel.send('Tag channels to be removed : ');
        collector.on('end',async(collected) =>{
            if(collected.size > 0){
                if(collected.first().mentions.channels.size > 0){
                    for(const ch of collected.first().mentions.channels){
                        var i = extrainfo.reactionID.indexOf(ch[1].id);
                        if(i!=-1){
                            extrainfo.reactionID.splice(i, 1);
                        }
                    }
                    await extrainfo.save();
                    message.channel.send('Deleted Successfully , Have a nice day :)');
                }else{
                    message.channel.send('No channels were tagged');
                }
                
            }
            else{
                message.channel.send('Request timed out');
            }
        })
    }
}