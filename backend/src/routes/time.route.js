const express = require('express');
const TimeController = require('../controllers/time.controller');
const Routes = express.Router();

Routes.delete("/time/:id", TimeController.remove)
Routes.put("/time/:id", TimeController.update)
Routes.get("/time/:id", TimeController.getOne)
Routes.get("/time", TimeController.index);
Routes.post("/time", TimeController.store);

module.exports = Routes;