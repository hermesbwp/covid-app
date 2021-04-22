const express = require('express');
const PlannerController = require('../controllers/planner.controller');
const Routes = express.Router();

Routes.delete("/planner/:id", PlannerController.remove)
Routes.put("/planner/:id", PlannerController.update)
Routes.get("/planner/:id", PlannerController.getOne)
Routes.get("/planner", PlannerController.index);
Routes.post("/planner", PlannerController.store);

module.exports = Routes;