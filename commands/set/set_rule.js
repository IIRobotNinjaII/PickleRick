module.exports = {
    name : 'set_rule',
    description : 'Sets the rule message',
    permissions : ["ADMINISTRATOR","MANAGE_CHANNELS"],
    async execute(client,message,args,Discord,serverData,extrainfo){

        const filter = m => m.author.id === message.author.id;
        
        const collector = new Discord.MessageCollector(message.channel,filter,{
            max:1,
            time : 1000 * 60,
        })

        message.channel.send("Copy and paste the message link for the rules message : ");

        collector.on('end',async(collected) =>{
            if(collected.size > 0){
                if(collected.first().content.includes('https://discord.com/channels/')){
                    let parts = collected.first().content.split('/');
                    if(parts.length == 7){
                        if(parts[4]===message.guild.id){
                            extrainfo.rulelink = collected.first().content;
                            await extrainfo.save();
                            message.channel.send('Thank you , Have a nice day :)')
                        }
                        else{
                            message.channel.send('Message link is from a different server');
                        }
                    }
                    else{
                        message.channel.send("Invalid message link");
                    }
                }
                else{
                    message.channel.send("No link was sent");
                }
            }
            else{
                message.channel.send("Request timed out");
            }
        })
    }
}