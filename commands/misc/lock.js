module.exports = {
    name : 'lock',
    description : "Locks the chanel.",
    permissions : ["MANAGE_GUILD"],
    async execute(client,message,args,Discord){
        try{
        message.channel.updateOverwrite(message.channel.guild.id,{SEND_MESSAGES:false});
        message.channel.send(`✅ Locked down ${message.channel.name}`);
        message.delete();
        }catch{}
    }
}