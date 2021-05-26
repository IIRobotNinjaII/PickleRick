const LevelInfo = require('../../models/XPlevelSchema')
module.exports = {
    name : 'delete_level',
    description : 'Deletes XP level rewards',
    permissions : ["ADMINISTRATOR","MANAGE_CHANNELS"],
    async execute(client,message,args,Discord){

        const filter = m => m.author.id === message.author.id;
        
        const collector = new Discord.MessageCollector(message.channel,filter,{
            max:1,
            time : 1000 * 60,
        })

        message.channel.send('Enter nickname to be deleted : ');

        collector.on('end',async(collected) =>{
            if(collected.size > 0){
                let arg = collected.first().content.split(' ')[0];
                let levelData =  await LevelInfo.findOneAndDelete({serverID : message.guild.id , nickname :arg})
                if(levelData){
                    message.channel.send("Deleted Successfully , Have a nice day :)");
                }else{
                    message.channel.send('No XP Level reward with that nickname was found');
                }
            }
            else{
                message.channel.send('Request timed out');
            }
        })
    }
}