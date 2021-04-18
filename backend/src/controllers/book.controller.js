const BookModel = require('../models/book.model');

class Book {
    async index(req, res) {
        try {
            const books = await BookModel.find();
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
        console.log(body);
        try {
            const book = await BookModel.create(body);
            res.send({ book });
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }
    async update(req, res) {
        const { body, params: { id } } = req;
        const book = await BookModel.findByIdAndUpdate(id, body, { new: true })
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