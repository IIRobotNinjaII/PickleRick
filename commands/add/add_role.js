const ReactionRoles = require('../../models/roleInfoSchema')
module.exports = {
    name : 'add_role',
    description : 'Add Reaction Role',
    permissions : ["MANAGE_GUILD"],
    perms : ["MANAGE_GUILD"],
    async execute(client,message,args,Discord){
        const filter = m => m.author.id === message.author.id;
        
        const collector = new Discord.MessageCollector(message.channel,filter,{
            max:4,
            time : 1000 * 60,
        })

        let roleData;
        let data = [];
        let counter = 0;

        message.channel.send("Enter a nickname (Ensure it hasn't been used before) :");

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
                        message.channel.send("Copy and paste message link : ");
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
                                message.channel.send("Tag role : ");
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
                        try{
                            await message.guild.me.roles.add(collected.mentions.roles.first().id);
                            await message.guild.me.roles.remove(collected.mentions.roles.first().id);
                        }catch{
                            message.channel.send('Sorry the role is higher than my role , please rectify this and try running the command again')
                            collector.stop();
                            return;
                        }
                        data.push(collected.mentions.roles.first().id)
                        counter = 3;
                    }
                    else{
                        message.channel.send("You didn't tag any roles");
                        collector.stop();
                        return;
                    }

                    message.channel.send("React to this message with an  emoji : ").then(msg => {
                        let emoji_filter = (reaction,user) => user.id === message.author.id;
                        let emoji_collector = msg.createReactionCollector(emoji_filter,{
                            time:20000 , maxEmojis : 1
                        })
                        emoji_collector.on('end',collected_emoji => {
                            if(collected_emoji.size>0){
                                if(!collected_emoji.first().emoji.guild || (collected_emoji.first().emoji.guild.id === message.guild.id && !collected_emoji.first().emoji.animated)){
                                    data.push(collected_emoji.first().emoji)
                                    counter = 4;
                                }else{
                                    message.channel.send("You reacted with a custom emoji from another server or you used an animated emoji :(");
                                }
                            }
                            collector.stop();
                            return;
                        })
                    })
                    break;

                }
            }
        })



        
        collector.on('end',async(m)=>{  
             
            if(m.size ==0 || m.size <=counter && counter!=4){
                message.channel.send("Time ran out")
            }  

            if(data.length == 5){
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
                        reaction : data[4].name
                    })
                    await roleData.save()
                }catch{
                    message.channel.send("Could not add reaction role");
                }
   
            }
            
        })

    }
}