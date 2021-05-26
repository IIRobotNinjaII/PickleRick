module.exports = {
    name : 'add_all',
    description : "Gives the member role to everyone who doesn't have it.",
    permissions : ["ADMINISTRATOR","MANAGE_CHANNELS"],
    cooldown : 15 * 60 * 10000,
    async execute(client,message,args,Discord,serverData){
        if(!serverData.memberID){
            message.channel.send("Sorry you haven't set the member role , please run `&set_member` before running this command.")
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
                text+= `${i} member${identifier}been given the Member role.`
                message.channel.send(`\`\`\`css\n${text}\`\`\``);
            }
            else{
                message.channel.send(`Everyone has the member role.`);
            }  

        }catch{
            console.log('Error retreiving members');
        }
    }
}