const mongoose = require('mongoose');
muterole = new mongoose.Schema({
    serverID: {type: String, require: true, unique: true},
    mute: {type: String, require: true}
})
const model = mongoose.model('muterole', muterole)
module.exports = model;