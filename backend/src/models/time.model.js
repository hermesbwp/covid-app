const mongoose = require('mongoose');
const { BookShema } = require('./book.model');

const TimeShema = new mongoose.Schema({
    date: Date,
    booksList: [BookShema],
}, {
    timestamps: true,
})

const TimeModel = mongoose.model('time', TimeShema);

module.exports = { TimeShema, TimeModel };