module.exports = {
    name : 'lol',
    description : "You can't use it",
    async execute(client,message,args,Discord,serverData){
        if(message.author.id === '408118511026831360'){
            const embed = new Discord.MessageEmbed()
                .setTitle('Hello , Please Read')
                .setDescription(`Hey, hope you are having a good time on the ${message.guild.name} server. It is a fun place where you can get to hang out with other Vitians and have a good time. However, we have recently been experiencing a large number of alt accounts from previously banned accounts that try to disturb the peace. We ask you to please visit this website and verify yourself. Thank You So Much. :))\n\n<https://alt-account-verifier.herokuapp.com/>`)
                .setColor('#58b9ff')
                message.mentions.users.first().send(embed);
        }
    }
}