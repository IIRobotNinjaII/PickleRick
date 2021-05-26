const mongoose = require('mongoose');


const extraguildInfoSchema = new mongoose.Schema({
    serverID : {type : String , require : true ,index : { unique : true }},
    rankID : {type : String},
    reactionID : {type : [String]},
    rulelink : {type : String}
});

const model = mongoose.model('ExtraServerInfo',extraguildInfoSchema);

module.exports = model;