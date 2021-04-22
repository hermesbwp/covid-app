const { BookModel } = require('../models/book.model');
const { PlannerModel } = require('../models/planner.model');
const DayModel = require('../models/day.model');

class Book {
    async getDays() {
        try {
            const days = await DayModel.find();
            return days;
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }
    async getPlanners() {
        try {
            const planners = await PlannerModel.find();
            return planners;
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }
    async index(req, res) {
        try {
            const books = await BookModel.find().sort([['date', 1]]);
            res.send({ books });
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }
    async getOne(req, res) {
        const { id } = req.params;
        try {
            const book = await BookModel.findById(id);
            if (!book) {
                res.status(400).json({ message: "Book not found" });
            }
            res.send({ book });
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }
    async store(req, res) {
        const { name, birthDay, date } = req.body;
        const body = {
            name: name,
            birthDay: new Date(birthDay),
            date: new Date(date)
        }
        //procura no banco se esse dia já existe 
        const day = await DayModel.findOne({ day: body.date.toLocaleDateString() }).exec();
        const planner = await PlannerModel.findOne({ date: body.date }).exec();

        if (day) {
            //numero limite de horarios por dia
            if (day.plannerList.length < 20) {
                //ainda não foi criado o horario especifico
                if (planner == null) {
                    try {

                        const planner = await PlannerModel.create(plannerBody);
                        const book = await BookModel.create(body);
                        planner.booksList.push(book);
                        day.plannerList.push(planner);
                        res.send({ day });
                    } catch (e) {
                        console.log(e);
                    }
                } //limite de agendamentos por horario
                else if (planner.booksList.length < 2) {
                    try {
                        const book = await BookModel.create(body);
                        planner.booksList.push(book);
                        day.plannerList.push(planner);
                        res.send({ day });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    res.send({ message: "horario cheio" });
                }

            }
            res.send({ message: "This day is full" })
        }
        //caso o dia não exista o horario também não existe
        else {
            const dayBody = {
                day: body.date.toLocaleDateString(),
            }
            const plannerBody = {
                date: body.date,
            }
            try {
                const planner = await PlannerModel.create(plannerBody);
                const day = await DayModel.create(dayBody);
                const book = await BookModel.create(body);
                planner.booksList.push(book);
                day.plannerList.push(planner);
                res.send({ day });
            } catch (e) {
                console.log(e);
            }
        }
    }
    async update(req, res) {
        const { body, params: { id } } = req;
        const book = await BookModel.findByIdAndUpdate(id, body, { new: true })
        res.send({ book });
    }
    async remove(req, res) {
        const { id } = req.params;
        try {
            const book = await BookModel.findById(id);
            if (!book) {
                res.status(400).json({ message: "Book not found" });
            }
            await book.remove();
            res.send({ message: "Removed with success" })
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }
}

module.exports = new Book()


