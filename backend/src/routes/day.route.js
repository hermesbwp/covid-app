const express = require('express');
const DayController = require('../controllers/day.controller');
const Routes = express.Router();

Routes.delete("/day/:id", DayController.remove)
Routes.put("/day/:id", DayController.update)
Routes.get("/day/:id", DayController.getOne)
Routes.get("/day", DayController.index);
Routes.post("/day", DayController.store);

module.exports = Routes;