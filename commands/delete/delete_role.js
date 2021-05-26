const message = require('../../events/guild/message');
const ReactionRoles = require('../../models/roleInfoSchema')
module.exports = {
    name : 'delete_role',
    description : 'Delete a Reaction Role',
    permissions : ["MANAGE_GUILD"],
    async execute(client,message,args,Discord){
        const filter = m => m.author.id === message.author.id;
        
        const collector = new Discord.MessageCollector(message.channel,filter,{
            max:1,
            time : 1000 * 60,
        })

        message.channel.send('Enter nickname to be deleted : ');

        collector.on('end',async(collected) =>{
            if(collected.size > 0){
                let arg = collected.first().content.split(' ')[0];
                let roleData =  await ReactionRoles.findOneAndDelete({serverID : message.guild.id , nickname :arg})
                if(roleData){
                    message.channel.send("Deleted Successfully , Have a nice day :)");
                }else{
                    message.channel.send('No reaction role with that nickname was found');
                }
            }
            else{
                message.channel.send('Request timed out');
            }
        })
    }
   
}