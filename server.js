const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
//color at console
const color = require('colors');
const errHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');
const auth = require('./routes/auth');

const app = express();

//Dev logging middleware
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Mount Route
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/auth', auth);

app.use(errHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
);

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
})