module.exports = {
    name : 'unlock',
    description : "Unlocks the chanel.",
    permissions : ["MANAGE_GUILD"],
    async execute(client,message,args,Discord){
        try{
        message.channel.updateOverwrite(message.channel.guild.id,{SEND_MESSAGES:null});
        message.channel.send(`✅ Unlocked ${message.channel.name}`);
        message.delete();
        }catch{}
    }
}