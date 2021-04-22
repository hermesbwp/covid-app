const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const BookRouter = require('./routes/book.route');
const DayRouter = require('./routes/day.route');
const PlannerRouter = require('./routes/planner.route');
const morgan = require('morgan');

const { MONGO_URL, HTTP_PORT } = process.env;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(morgan("dev"));

app.use('/api', BookRouter);
app.use('/api', DayRouter);
app.use('/api', PlannerRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Hello world', query: req.query });
})

app.listen(HTTP_PORT, () => {
    console.log(`Rodando na porta ${HTTP_PORT}`);
});