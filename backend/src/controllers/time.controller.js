const { TimeModel } = require('../models/time.model');
//8 da manha
const initHour = 28800000;
//15 minutos
const timeInterval = 900000;
//18 horas
const finalHour = 36000000;
class Time {
    async deleteAll(req, res) {
        try {
            const times = await TimeModel.find();
            times.map((time) => {
                time.remove();
            })
            res.send({ message: "todos registros de horarios deletados" })
        }
        catch (e) {
            console.log(e);
        }
    }

    async index(req, res) {
        try {
            const time = await TimeModel.find().sort([['date', 1]]);
            res.send({ time });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }


    async getOne(req, res) {
        const { id } = req.params;
        try {
            const time = await TimeModel.findById(id);
            if (time) {
                res.send({ message: "Time not found" })
            }
            res.send({ time })
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }

    async store(req, res) {
        const { date, booksList } = req.body;
        //verificando se já não existe esse horário no banco
        if (!TimeModel.findOne({ date: date })) {
            const body = {
                date: date,
                booksList: booksList,
            }
            try {
                const time = await TimeModel.create(body)
                res.send({ time });
            } catch (e) {
                console.log(e.message);
                res.status(400).json({ message: "An unexpected error happend" });
            }
        } else {
            res.send({ message: "Time already exists" });
        }
    }
    async remove(req, res) {
        const { id } = req.params;
        try {
            const time = await TimeModel.findById(id);
            if (!time) {
                res.send({ message: "Time doesn't exists" })
            }
            await time.remove();
            res.send({ message: "Time removed" });
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }
    async update(req, res) {
        const { body, params: { id } } = req;
        const time = await TimeModel.findByIdAndUpdate(id, body, { new: true })
        res.send({ time });
    }
}

module.exports = new Time()