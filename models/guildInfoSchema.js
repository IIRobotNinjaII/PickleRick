const mongoose = require('mongoose');

const guildInfoSchema = new mongoose.Schema({
    serverID : {type : String , require : true ,index : { unique : true }},
    memberID : {type : String},
    lock : {type : Number , default : 0},
});

const model = mongoose.model('ServerModels',guildInfoSchema);

module.exports = model;