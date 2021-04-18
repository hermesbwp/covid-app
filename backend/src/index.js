const { request } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const UserRouter = require('./routes/user.route');
const BookRouter = require('./routes/book.route');

const { MONGO_URL, HTTP_PORT } = process.env;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(bodyParser.json())

app.use('/api', UserRouter);
app.use('/api', BookRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Hello world', query: req.query });
})

app.listen(HTTP_PORT, () => {
    console.log(`Rodando na porta ${HTTP_PORT}`);
});