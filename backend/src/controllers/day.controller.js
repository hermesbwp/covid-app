const DayModel = require('../models/day.model')

class Day {
    async deleteAll(req, res) {
        try {
            const days = await DayModel.find();
            days.map((day) => {
                day.remove();
            })
            res.send({ message: "todos registros de dias deletados" })
        }
        catch (e) {
            console.log(e);
        }
    }
    async index(req, res) {
        try {
            const days = await DayModel.find().sort([['date', 1]]);
            res.send({ days });
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }
    async store(req, res) {
        const { day } = req.body;
        const days = await DayModel.find();
        try {
            const day = await DayModel.create(body);
            res.send({ day });
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
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
}



module.exports = new Day()