const mongoose = require('mongoose');
profileschema = new mongoose.Schema({
    UserID: {type: String, require: true, unique: true},
    username: {type: String, require: true},
    songname: {type: Array},
    songurl: {type: Array, unique: true}
})
const model = mongoose.model('playlist', profileschema)

module.exports = model;