const mongoose = require('mongoose');
profileschema = new mongoose.Schema({
    UserID: {type: String, require: true, unique: true},
    username: {type: String, require: true},
    quantity: {type: Number, default: 0},
    songname: {type: String}
    //songurl: {type: String, unique: true}
})
const model = mongoose.model('playlist', profileschema)

module.exports = model;