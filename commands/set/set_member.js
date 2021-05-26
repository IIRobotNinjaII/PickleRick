module.exports = {
    name : 'set_member',
    description : 'Sets the member role for the server',
    permissions : ["ADMINISTRATOR","MANAGE_CHANNELS"],
    async execute(client,message,args,Discord,serverData){

        const filter = m => m.author.id === message.author.id;
        
        const collector = new Discord.MessageCollector(message.channel,filter,{
            max:5,
            time : 1000 * 60,
        });

        if(serverData.memberID) counter = 1;
        else counter = 0;


        let questions = ['Tag the member role : ','You have already set a member role , do you wish to update it ? Press Y if you wish to continue : ','Do you wish to restrict all channels to be accessed only by members? Press Y to continue : ',"Tag channels you wish to exclude : \nIf you don't want to tag any channels type none : "];
        message.channel.send(questions[counter])
        collector.on('collect',async(collected) =>{
            switch(counter){
                case 0 : {
                    if(collected.mentions.roles.size > 0){
                        serverData.memberID = collected.mentions.roles.first().id;
                        counter = 2;
                    }
                    else{
                         message.channel.send("It seems you didn't tag a role");
                         collector.stop();
                         return;
                    }
                    break;
                }
                case 1 :{
                    if(collected.content == 'Y' || collected.content == 'y'){
                        counter = 0;
                    }
                    else{
                        collector.stop();
                        return;
                    }
                    break;
                }
                case 2:{
                    if(collected.content == 'Y' || collected.content == 'y'){
                        counter = 3;
                        serverData.lock = 1;
                    }
                    else{
                        collector.stop();
                        return;
                    }
                    break;
                }
                case 3:{
                    let arr = [];
                    if(collected.mentions.channels.size > 0){
                        collected.mentions.channels.forEach(val =>{
                            arr.push(val.id)
                        })
                    }
                    message.guild.channels.cache.forEach(channel =>{
                        if(!arr.includes(channel.id)){
                            try{
                                channel.updateOverwrite(message.guild.id,{VIEW_CHANNEL:false});
                                channel.updateOverwrite(serverData.memberID,{VIEW_CHANNEL:true});
                            }catch{
                                console.log("Fault in channel overwrite");
                            }

                        }
                    })
                    collector.stop();
                    return;
                }
            }
            message.channel.send(questions[counter]);

        })
        collector.on('end',async(m)=>{  
             
            if(m.size ==0 ){
                message.channel.send("Time ran out")
            }  
            else{
                await serverData.save();
                message.channel.send('Thank you , Have a nice day :)');    
            }
        })
    }
}