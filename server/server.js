const path = require('path');
const express = require('express');


require('dotenv').config();

const mongoose = require('mongoose');

const app = express();

const apiRouter = require('./routes/api');

const PORT = 3000;

mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.gkvfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once('open', () => {
  console.log('Connected to The Pantless Thundergoose Database');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/build', express.static(path.join(__dirname, '../build')));


app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/login', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use('/api', apiRouter);



// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('Unknown route!'));

// express error handler

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * START SERVER
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
