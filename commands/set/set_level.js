module.exports = {
    name : 'set_level',
    description : 'Set the rank up channel',
    permissions : ["MANAGE_GUILD"],
    async execute(client,message,args,Discord,serverData,extrainfo){

        const filter = m => m.author.id === message.author.id;
        
        const collector = new Discord.MessageCollector(message.channel,filter,{
            max:1,
            time : 1000 * 60,
        })

        message.channel.send('Tag the rank up channel : ');

        collector.on('end',async(collected) =>{
            if(collected.size > 0){
                if(collected.first().mentions.channels.size > 0){
                    extrainfo.rankID = collected.first().mentions.channels.first().id;
                    await extrainfo.save();
                    message.channel.send('Saved Successfully , Have a nice day :)')
                }
            }
            else{
                message.channel.send("Request timed out");
            }
        })
    }
}