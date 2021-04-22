const mongoose = require('mongoose');

const BookShema = new mongoose.Schema({
    name: String,
    birthDay: Date,
    date: Date
}, {
    timestamps: true
});

const BookModel = mongoose.model('book', BookShema);

module.exports = { BookShema, BookModel };