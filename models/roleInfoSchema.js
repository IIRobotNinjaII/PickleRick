const mongoose = require('mongoose');


const roleInfoSchema = new mongoose.Schema({
    nickname : {type:String},
    serverID : {type : String},
    roleID : {type : String},
    messageID : {type : String},
    channelID : {type :String},
    reaction : {type :String}
});

const model = mongoose.model('ReactionRoles',roleInfoSchema);

module.exports = model;