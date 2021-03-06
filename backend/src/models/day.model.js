const mongoose = require('mongoose');
const { TimeShema } = require('./time.model');

const DayShema = new mongoose.Schema({
    date: String,
    qtdBook: { type: Number, default: 0 }
}, {
    timestamps: true
});

const DayModel = mongoose.model('day', DayShema);

module.exports = DayModel;