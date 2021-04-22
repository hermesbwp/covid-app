const mongoose = require('mongoose');
const { PlannerShema } = require('./planner.model');

const DayShema = new mongoose.Schema({
    day: String,
    plannerList: [PlannerShema],
}, {
    timestamps: true
});

const DayModel = mongoose.model('day', DayShema);

module.exports = DayModel;