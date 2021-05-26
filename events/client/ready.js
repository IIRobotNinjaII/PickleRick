require('dotenv').config();
module.exports = (Discord,client) =>{
    console.log("Bot is online")
    client.user.setActivity(`${process.env.PREFIX}help`)
}