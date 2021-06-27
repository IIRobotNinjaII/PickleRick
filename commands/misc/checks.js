module.exports = {
    name : 'checks',
    description : "Tells you who all don't have the member role.",
    permissions : ["MANAGE_GUILD"],
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
            members.forEach(member => {
                if(!member.user.bot){
                    if(!member.roles.cache.has(serverData.memberID)){
                        text+= `<@!${member.user.id}> has not reacted\n`; 
                        i++;
                    }
                }
            })
        }catch{
            console.log("Error collecting members")
        }finally{
            if(i>0){
                let identifier = ' has ';
                if(i>1) identifier = 's have ';
                text+= `${i} member${identifier}not reacted.`
                message.channel.send(`${text}`);
            }
            else{
                message.channel.send(`Everyone has the member role`);
            }
        }
    }
}