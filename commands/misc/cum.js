module.exports = {
    name : 'cum',
    description : "cums",
    permissions : ["MANAGE_GUILD"],
    perms : ["MANAGE_GUILD"],
    cooldown : 15 * 60 * 1000,
    async execute(client,message,args,Discord,serverData){
        if(!serverData.memberID){
            message.channel.send("Sorry you haven't set the member role , please run `&set_member` before running this command.")
            return;
        }           

        if(!extrainfo.rulelink){
            message.channel.send("Sorry you haven't set the rule link , please run `&set_rule` before running this command.")
            return;
        } 
        
        try{
            await message.guild.me.roles.add(serverData.memberID);
            await message.guild.me.roles.remove(serverData.memberID);
        }catch{
            message.channel.send('Sorry the member role is higher than my role , please rectify this and try running the command again')
            return;
        }
        
        var i = 0; let text = '';
        let members;
        try{
            members = await message.guild.members.fetch();

            for(const member of members){
                if(!member[1].user.bot){
                    if(!member[1].roles.cache.has(serverData.memberID)){
                        try{
                            await member[1].roles.add(serverData.memberID);
                            await member[1].user.send(`Hey <@!${member[1].user.id}> , it looks like you still have'nt accepted the rules of the ${message.guild.name} Discord Server.\nWithout accepting them you won't be able to access the server. Please follow the steps below so you can access the server. Click on this link below and read the rules and then click on the 👍 emoji .It's that simple .I have also attached screenshots below to further help you.\n${extrainfo.rulelink}\nhttps://i.imgur.com/Iue3Wrm.png`);
                            text+= `${member[1].user.username} has been given the member role\n`; 
                            i++;
                        }catch{
                            message.channel.send("`Missing Perms`");
                            console.log('Error adding member role')
                        }
                        
                    }
                }
            }
            if(i>0){
                let identifier = ' has ';
                if(i>1) identifier = 's have ';
                text+= `${i} member${identifier}been creamed.`
                message.channel.send(`\`\`\`yaml\n${text}\`\`\``);
            }
            else{
                message.channel.send(`Everyone has cum.`);
            }  

        }catch{
            console.log('Error retreiving members');
        }
    }
}