const DayModel = require('../models/day.model')

class Day {
    async index(req, res) {
        try {
            const days = await DayModel.find().sort([['date', 1]]);
            res.send({ days });
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        try {
            const day = await DayModel.findById(id);
            if (!day) {
                res.status(400).json({ message: "Book not found" });
            }
            res.send({ day });
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }

    async store(req, res) {
        const { day } = req.body;
        const days = await DayModel.find()
        //verificando se o dia já está no 
        if (!DayModel.findOne({ day: day })) {
            const body = {
                name: day,
                vacanciesLimit: 20
            }
            try {
                const day = await DayModel.create(body);
                res.send({ day });
            } catch (e) {
                console.log(e.message);
                res.status(400).json({ message: "An unexpected error happend" });
            }
        }
        res.send({ message: "Day already exists" })
    }
    async remove(req, res) {
        const { id } = req.params;
        try {
            const day = await DayModel.findById(id);
            if (!day) {
                res.status(400).json({ message: "Day not found" });
            }
            await day.remove();
            res.send({ message: "Removed with success" })
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }
    async update(req, res) {
        const { body, params: { id } } = req;
        const day = await DayModel.findByIdAndUpdate(id, body, { new: true })
        res.send({ day });
    }
}

module.exports = new Day()