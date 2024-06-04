const express = require("express");
require("dotenv").config();
var bodyParser = require('body-parser');
var cors = require('cors');
const localDb = require('./db/localDb')('user');
const router = require('./routes')

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack); // Log errors
    res.status(500).send('Algo ha ido mal!'); // Send generic error response
});

app.use('/', router);

app.post('/user', async (req, res) => {
    try {
        const userId = await localDb.create(req.body);
        res.status(201).json({ id: userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/user/:id', async (req, res) => {
    try {
        const success = await localDb.delete(req.params.id);
        if (success) {
            res.status(200).send();
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/user/:id', async (req, res) => {
    try {
        const success = await localDb.update({ ...req.body, id: req.params.id });
        if (success) {
            res.status(200).send();
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/user', async (req, res) => {
    try {
        const users = await localDb.filter();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, ()=>{
    console.log(`The server is listen on PORT: ${port}`);
})
