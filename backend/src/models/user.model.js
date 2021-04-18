const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
}, {
    timestamps: true
});

const UserModel = mongoose.model('user', UserShema);

module.exports = UserModel;