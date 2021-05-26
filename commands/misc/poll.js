module.exports = {
    name : 'poll',
    description : "Sends a poll",
    permissions : ["MANAGE_GUILD"],
    async execute(client,message,args,Discord){
        const filter = m => m.author.id === message.author.id;
        
        const collector = new Discord.MessageCollector(message.channel,filter,{
            time : 1000 * 120,
        })

        let topics = [] , counter = 0 , title;
        message.channel.send('Tag the channel to which the poll must be sent to : ');
        collector.on('collect',collected =>{
            switch(counter){
                case 0 :{
                    if(collected.mentions.channels.size > 0 ){
                        message.channel.send('Enter your question : ');
                        counter = 1;
                    }else{
                        message.channel.send("No channels were found");
                        collector.stop();
                        return;
                    }
                    break;
                }
                case 1 :{
                    title = collected.content;
                    counter = 2;
                    message.channel.send('Keep sending the topics one by one and type `end` when you have finished. You have a maximum of 2 minutes to send you topics.')
                    break;
                }
                case 2:{
                    if(collected.content.toLowerCase() == 'end'){
                        counter = 3;
                        collector.stop();
                        return;
                    }else{
                        topics.push(collected.content)
                    }
                    break;
                }
            }
        })
        collector.on('end',async(m)=>{
            if(m.size == 0)
                message.channel.send('Request timed out')
            if(counter == 3 && topics){
                let embeds = [] , count = 0;
                let raw_emojis = "🇦,🇧,🇨,🇩,🇪,🇫,🇬,🇭,🇮,🇯,🇰,🇱,🇲,🇳,🇴,🇵,🇶,🇷,🇸,🇹,🇺,🇻,🇼,🇽,🇾,🇿🇿" , emoji_count = 0;
                let emojis = raw_emojis.split(',');
                for(const topic of topics){
                    if(!embeds[Math.floor(count/20)]){
                        const embed = new Discord.MessageEmbed()
                        .setTitle(title)
                        .setDescription(`React with the preferred emoji - `)
                        .setColor(9788551);
                        embeds.push(embed);
                        emoji_count = 0;
                    }
                    embeds[Math.floor(count/20)].addField(`Option ${emoji_count+1}`,`${emojis[emoji_count]} - ${topic}`,true);
                    count++;
                    emoji_count++;
                }
                let channel = m.first().mentions.channels.first();
                for(const embed of embeds){
                    await channel.send(embed).then(async(msg) =>{
                        for(var i=0;i<msg.embeds[0].fields.length;i++){
                            await msg.react(emojis[i]);
                        }
                    });
                }
            }
        })
    }
}