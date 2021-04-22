const PlannerModel = require('../models/planner.model');

class Planner {
    async index(req, res) {
        try {
            const planners = await PlannerModel.find().sort([['date', 1]]);
            res.send({ planners });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        try {
            const planner = await PlannerModel.findById(id);
            if (!planner) {
                res.send({ message: "Planner not found" })
            }
            res.send({ planner })
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }

    async store(req, res) {
        const { date, booksList, vacanciesLimit } = req.body;
        //verificando se já não existe esse horário no banco
        if (!PlannerModel.findOne({ date: date })) {
            const body = {
                date: date,
                booksList: booksList,
                vacanciesLimit: vacanciesLimit
            }
            try {
                const planner = await PlannerModel.create(body)
                res.send({ planner });
            } catch (e) {
                console.log(e.message);
                res.status(400).json({ message: "An unexpected error happend" });
            }
        } else {
            res.send({ message: "Planner already exists" });
        }
    }
    async remove(req, res) {
        const { id } = req.params;
        try {
            const planner = await PlannerModel.findById(id);
            if (!planner) {
                res.send({ message: "Planner doesn't exists" })
            }
            await book.remove();
            res.send({ message: "Planner removed" });
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }
    async update(req, res) {
        const { body, params: { id } } = req;
        const planner = await PlannerModel.findByIdAndUpdate(id, body, { new: true })
        res.send({ book });
    }

}

module.exports = new Planner()