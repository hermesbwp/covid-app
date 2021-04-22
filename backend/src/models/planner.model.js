const mongoose = require('mongoose');
const { BookShema } = require('./book.model');

const PlannerShema = new mongoose.Schema({
    date: Date,
    booksList: [BookShema],
}, {
    timestamps: true,
})

const PlannerModel = mongoose.model('planner', PlannerShema);

module.exports = { PlannerShema, PlannerModel };