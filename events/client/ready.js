require('dotenv').config();
module.exports = () =>{
    console.log("Bot is online")
    client.user.setActivity(`${process.env.PREFIX}help`)
}