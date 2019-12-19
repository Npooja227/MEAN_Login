const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost/users',{ useNewUrlParser: true, useUnifiedTopology: true  });

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
}

//Routes
app.use('/api', cors(corsOptions), require('./routes/user'));

//Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Listening at ${port}`));