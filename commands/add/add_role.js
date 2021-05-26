const ReactionRoles = require('../../models/roleInfoSchema')
module.exports = {
    name : 'add_role',
    description : 'Add Reaction Role',
    permissions : ["ADMINISTRATOR","MANAGE_CHANNELS"],
    async execute(client,message,args,Discord){
        const filter = m => m.author.id === message.author.id;
        
        const collector = new Discord.MessageCollector(message.channel,filter,{
            max:4,
            time : 1000 * 60,
        })

        let roleData;
        let data = [];
        let counter = 0;
        let questions = ["Enter a nickname (Ensure it hasn't been used before) :","Copy and paste message link : ","Tag role : ","Enter emoji (Ensure it is not a custom emoji): "];

        message.channel.send(questions[0]);

        collector.on('collect',async(collected) => {
            switch(counter){
                case 0 : {
                    let arg = collected.content.split(' ')[0];
                    roleData = await ReactionRoles.findOne({ serverID : message.guild.id , nickname : arg});
                    if(roleData){
                        message.channel.send("Sorry there already exists another reaction role with the same name");
                        collector.stop();
                        return;
                    }
                    else{
                        data.push(arg)
                        counter = 1;
                    }
                    break;
                }
                case 1: {
                    if(collected.content.includes('https://discord.com/channels/')){
                        let parts = collected.content.split('/');
                        if(parts.length == 7){
                            if(parts[4]===message.guild.id){
                                data.push(parts[5])
                                data.push(parts[6])
                                counter = 2;
                            }
                            else{
                                message.channel.send('Message link is from a different server');
                                collector.stop();
                                return;
                            }
                        }
                        else{
                            message.channel.send("Invalid message link");
                            collector.stop();
                            return;
                        }
                    }
                    else{
                        message.channel.send("Invalid Link");
                        collector.stop();
                        return;
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
                    const extractEmoji = require('extract-emoji');
                    let emojis = extractEmoji.extractEmoji(collected.content);
                    if(emojis.length > 0){
                        data.push(emojis[0]);
                        counter = 4;
                        collector.stop();
                        return;
                    }
                    else{
                        message.channel.send("You didn't send any emojis");
                        collector.stop();
                        return;
                    }
                    break;
                }
            }
            message.channel.send(questions[counter]);
        })

        collector.on('end',async(m)=>{  
             
            if(m.size ==0 || m.size <=counter && counter!=4){
                message.channel.send("Time ran out")
            }  

            if(counter == 4){
                try{
                    let channel = await message.guild.channels.cache.get(data[1]);
                    await channel.messages.fetch();
                    await channel.messages.cache.get(data[2]).react(data[4]);
                    message.channel.send('Thank you , Have a nice day :)'); 
                    roleData = await ReactionRoles.create({
                        nickname : data[0],
                        serverID : message.guild.id,
                        roleID : data[3],
                        messageID : data[2],
                        channelID : data[1],
                        reaction : data[4]
                    })
                    await roleData.save()
                }catch{
                    message.channel.send("Could not add reaction role");
                }
   
            }
            
  
        })

    }
}