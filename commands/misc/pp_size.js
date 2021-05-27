module.exports = {
    name : 'pp_size?',
    description : "Measures your pp",
    async execute(client,message,args,Discord){
        var x=Math.floor(Math.random() * 35);
        var i;var p="=";var k;
        if(x<=4)
        k='smol';
        else if(x>4 && x<=8)
        k='average';
        else if(x>8 && x<=25)
        k='big';
        else if(x>25)
        k='humongous';
        for(i=0;i<x;i++)
        p += "=";
        const embed = new Discord.MessageEmbed()
        .setTitle('peepee size machine')
        .setColor(0xFF33E3);
            
        if(message.mentions.users.size > 0){
            embed.addField(message.mentions.users.first().username + "'s penis",'8' + p + 'D\nhehe pp '+ k)
        }else{
            embed.addField(message.author.username + "'s penis",'8' + p + 'D\nhehe pp '+ k)
        }

        message.channel.send(embed);
    }
}