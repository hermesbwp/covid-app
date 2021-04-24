const mongoose = require('mongoose');

const BookShema = new mongoose.Schema({
    name: String,
    date: Date,
    isRetired: Boolean,
    isVaccinated: Boolean
}, {
    timestamps: true
});

const BookModel = mongoose.model('book', BookShema);

module.exports = { BookShema, BookModel };