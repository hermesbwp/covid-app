const mongoose = require('mongoose');

const BookShema = new mongoose.Schema({
    name: String,
    birthDay: String,
    date: String

}, {
    timestamps: true
});

const BookModel = mongoose.model('book', BookShema);

module.exports = BookModel;