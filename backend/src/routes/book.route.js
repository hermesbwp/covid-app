const express = require('express');
const BookController = require('../controllers/book.controller');
const Routes = express.Router();

Routes.delete("/book/:id", BookController.remove)
Routes.put("/book/:id", BookController.update)
Routes.get("/book/:id", BookController.getOne)
Routes.get("/book", BookController.index);
Routes.post("/book", BookController.store);

module.exports = Routes;