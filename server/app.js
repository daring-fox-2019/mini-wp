require('dotenv').config();

const express  = require('express');
const app      = express();
const cors     = require('cors');
const morgan   = require('morgan');
const PORT     = process.env.PORT || 3000;
const routes   = require('./routes');
const mongoose = require('mongoose');
const DB       = process.DB_URI

mongoose.connect(DB, { useNewUrlParser: true });

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(PORT, () => {
    console.log('🎉 App listening on port', PORT)
})
