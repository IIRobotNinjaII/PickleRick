const mongoose = require('mongoose');


const XPlevelSchema = new mongoose.Schema({
    nickname : {type:String},
    serverID : {type : String},
    roleID : {type : String},
    message : {type : String},
    level : {type : Number}
});

const model = mongoose.model('LevelInfo',XPlevelSchema);

module.exports = model;