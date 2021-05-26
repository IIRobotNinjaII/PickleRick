const mongoose = require('mongoose');

const guildInfoSchema = new mongoose.Schema({
    serverID : {type : String},
    memberID : {type : String},
    lock : {type : Number , default : 0},
});

const model = mongoose.model('ServerModels',guildInfoSchema);

module.exports = model;