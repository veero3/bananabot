const mongoose = require('mongoose');
profileschema = new mongoose.Schema({
    UserID: {type: string, require: true, unique: true},
    ServerID: {type: string, require: true, unique: false},
    quantity: {type: number, default: 0},
    songname: {type: string}
})
const model = mongoose.model('playlist', profileschema)

module.exports = model;