const express = require("express");
require("dotenv").config();
var bodyParser = require('body-parser');
var cors = require('cors');
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

app.listen(port, ()=>{
    console.log(`The server is listen on PORT: ${port}`);
})
