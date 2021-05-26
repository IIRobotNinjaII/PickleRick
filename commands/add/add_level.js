const LevelInfo = require('../../models/XPlevelSchema')
module.exports = {
    name : 'add_level',
    description : 'Add XP level rewards',
    permissions : ["ADMINISTRATOR","MANAGE_CHANNELS"],
    async execute(client,message,args,Discord,serverData,extrainfo){

        if(!extrainfo.rankID){
            message.channel.send("It seems you have not specified the rank up channel , please run `&set_level` before running this command");
            return;
        }
        const filter = m => m.author.id === message.author.id;
        
        const collector = new Discord.MessageCollector(message.channel,filter,{
            max:4,
            time : 1000 * 60,
        })
        
        let levelData;
        let data = [];
        let counter = 0;
        let questions = ["Enter a nickname (Ensure it hasn't been used before) :","Enter at which level this must be awarded : ","Tag role : ","Enter message to be sent to the user : "];

        message.channel.send(questions[0]);

        collector.on('collect',async(collected) => {
            switch(counter){
                case 0 : {
                    let arg = collected.content.split(' ')[0];
                    levelData = await LevelInfo.findOne({ serverID : message.guild.id , nickname : arg});
                    if(levelData){
                        message.channel.send("Sorry there already exists another level reward with the same name")
                        collector.stop();
                        return;
                    }
                    else{
                        data.push(arg)
                        counter = 1;
                    }
                    break;
                }
                case 1 : {
                    if(isNaN(collected.content)){
                        message.channel.send("Invalid Argument");
                        collector.stop();
                        return;
                    }
                    else{
                        data.push(parseInt(collected.content,10))
                        counter = 2;
                    }
                    break;
                }
                case 2:{
                    if(collected.mentions.roles.size >0){
                        data.push(collected.mentions.roles.first().id)
                        counter = 3;
                    }
                    else{
                        message.channel.send("You didn't tag any roles");
                        collector.stop();
                        return;
                    }
                    break;
                }
                case 3:{
                    data.push(collected.content)
                    counter = 4;
                    collector.stop();
                    return;
                }
            }
            message.channel.send(questions[counter]);
        })

        collector.on('end',async(m)=>{  
             
            if(m.size ==0 || m.size <=counter && counter!=4){
                message.channel.send("Time ran out")
            }  

            if(counter == 4){
                levelData = await LevelInfo.create({
                    serverID : message.guild.id,
                    nickname : data[0],
                    roleID : data[2],
                    level : data[1],
                    message: data[3]
                })
                await levelData.save();
                message.channel.send('Thank you , Have a nice day :)');    
            }
            
  
        })
    }
}