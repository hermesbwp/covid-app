const express = require('express');
const DayController = require('../controllers/day.controller');
const Routes = express.Router();

Routes.delete("/day", DayController.deleteAll)
Routes.delete("/day/:id", DayController.remove)
Routes.get("/day", DayController.index);
Routes.post("/day", DayController.store);

module.exports = Routes;