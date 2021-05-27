module.exports = {
    name : 'rick_roll',
    description : "Well yes",
    async execute(client,message,args,Discord){
        const embed1 = new Discord.MessageEmbed()
            .setTitle('**NEVER GONNA GIVE YOU UP!!!!!**')
            .setColor(0x33FFF1)
            .setImage('https://media1.tenor.com/images/467d353f7e2d43563ce13fddbb213709/tenor.gif?itemid=12136175')
        message.channel.send(embed1);
    }
}