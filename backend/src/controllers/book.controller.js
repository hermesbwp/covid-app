const { BookModel } = require('../models/book.model');
const { TimeModel } = require('../models/time.model');
const DayModel = require('../models/day.model');

const ageToRetiree = 65;
const bookDayLimit = 20;
const timeDayLimit = 2;
class Book {
    async deleteAll(req, res) {
        try {
            const books = await BookModel.find();
            books.map((book) => {
                book.remove();
            })
            res.send({ message: "todos registros deletados" })
        }
        catch (e) {
            console.log(e);
        }
    }
    async getDays() {
        try {
            const days = await DayModel.find();
            return days;
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }
    async getTime() {
        try {
            const time = await TimeModel.find();
            return time;
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
        //birthDay vem como a idade do usuario
        const { name, date, birthDay } = req.body;
        let isRetired = false;
        //verificando se idoso
        if (birthDay >= ageToRetiree) {
            isRetired = true;
        }
        const bodyBook = {
            name: name,
            date: new Date(date),
            isRetired: isRetired,
            isVaccinated: false
        }
        //procurando dia no banco
        const day = await DayModel.findOne({ date: bodyBook.date.toLocaleDateString() }).exec()
        //procurando o horario no banco
        const time = await TimeModel.findOne({ date: bodyBook.date }).exec()
        //caso exista o dia
        if (day) {//numero limite de vagas por dia
            if (day.qtdBook < bookDayLimit) {
                //ainda não foi criado o horario especifico
                if (time == null) {
                    const timeBody = {
                        date: bodyBook.date,
                    }
                    try {
                        const time = await TimeModel.create(timeBody);
                        const book = await BookModel.create(bodyBook);
                        time.booksList.push(book);
                        await time.save();
                        day.qtdBook = day.qtdBook + 1;
                        await day.save();
                        res.send({ day });
                    } catch (e) {
                        console.log(e);
                    }
                } //limite de agendamentos por horario
                else if (time.booksList.length < timeDayLimit) {
                    try {
                        const book = await BookModel.create(bodyBook);
                        time.booksList.push(book);
                        await time.save();
                        day.qtdBook = day.qtdBook + 1;
                        await day.save();
                        res.send({ day });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    //se for idoso outra validação
                    //verificar se os horarios estao ocupados por idosos
                    if (isRetired) {
                        //se no horario so tiverem idosos o idoso que se cadastrou por ultimo fica sem vaga
                        if (time.booksList[0].isRetired && time.booksList[1].isRetired) {
                            res.send({ message: "horario cheio" });
                        } else {
                            //nao preciso atualizar as contagens para o limite
                            if (!time.booksList[0].isRetired) {
                                const book_ = await BookModel.findById(time.booksList[0].id);
                                await book_.remove();
                                const book = await BookModel.create(bodyBook);
                                //nao consigo tirar o agendamento da lista de agendamentos time
                                time.booksList.push(book);
                                await time.save()
                                res.send({ book })
                            } else {
                                const book_ = await BookModel.findById(time.booksList[1].id);
                                await book_.remove()
                                const book = await BookModel.create(bodyBook);
                                //nao consigo tirar o agendamento da lista de agendamentos time
                                time.booksList.push(book);
                                await time.save()
                                res.send({ book })
                            }
                        }

                    } else {
                        res.send({ message: "horario cheio" });
                    }
                }
            } else {
                res.send({ message: "This day is full" })
            }
        } else {
            const dayBody = {
                date: bodyBook.date.toLocaleDateString(),
                bookLimit: 1
            }
            const timeBody = {
                date: bodyBook.date,
            }
            try {
                const time = await TimeModel.create(timeBody);
                const day = await DayModel.create(dayBody);
                const book = await BookModel.create(bodyBook);
                time.booksList.push(book);
                day.qtdBook = day.qtdBook + 1;
                await day.save();
                await time.save();
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

