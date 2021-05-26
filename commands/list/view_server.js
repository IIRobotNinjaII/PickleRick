module.exports = {
    name : 'view_server',
    description : 'Lists server details',
    permissions : ["MANAGE_GUILD"],
    async execute(client,message,args,Discord,serverData,extrainfo){
        if(serverData){
            const embed = new Discord.MessageEmbed()
                .setTitle('Server Details')
                .setColor(698814);
            if(serverData.memberID)
                embed.addField('Member Role',`<@&${serverData.memberID}>`);
            if(extrainfo.rankID)
                embed.addField('Rank Up Channel',`<#${extrainfo.rankID}>`);
            if(extrainfo.reactionID.length > 0){
                let text = '';
                extrainfo.reactionID.forEach(ch => text+=`<#${ch}> , `)
                text = text.slice(0,text.length -2);
                embed.addField('Upvote/Downvote Channels',text)
            }
            if(extrainfo.rulelink)
                embed.addField('Rule Reaction Link',`[Go to message!](${extrainfo.rulelink})`)
            if(serverData.lock){
                let text;
                if(serverData.lock == 1)
                    text = "True";
                else
                    text = "False";
                embed.addField('Auto Update Perms of New Channels',text)
            }
            await message.channel.send(embed);
        }
    }
}