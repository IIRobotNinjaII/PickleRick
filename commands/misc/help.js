require('dotenv').config();
module.exports = {
    name : 'help',
    description : "Help page",
    async execute(client,message,args,Discord){
        var i = 1;
        const embed = new Discord.MessageEmbed()
            .setTitle('List Of Available Commands - ')
            .setDescription(`Always run a command with ${process.env.PREFIX}`)
            .setColor(171727)
            .setAuthor('IIRobotNinjaII#6222',"https://cdn.discordapp.com/emojis/814712394772906005.png");
        client.commands.forEach(cmd =>{
            embed.addField(`${i} - ${cmd.name}`,`${cmd.description}`)
            i++;
        })
        embed.addField("Bot Source Code","[Github](https://github.com/IIRobotNinjaII/PickleRick)",true);
        embed.addField("Bot Invite","[Click here](https://discord.com/oauth2/authorize?client_id=756214368839925850&scope=bot&permissions=8)",true);
        message.channel.send(embed);
    }
}