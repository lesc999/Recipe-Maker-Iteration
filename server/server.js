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
  console.log('Connected to FunkyMunch Database');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/build', express.static(path.join(__dirname, '../build')));
//Passport login

// app.post('/my-login',
//   // wrap passport.authenticate call in a middleware function
//   function (req, res, next) {
//     // call passport authentication passing the "local" strategy name and a callback function
//     passport.authenticate('local', function (error, user, info) {
//       // this will execute in any case, even if a passport strategy will find an error
//       // log everything to console
//       console.log(error);
//       console.log(user);
//       console.log(info);

//       if (error) {
//         res.status(401).send(error);
//       } else if (!user) {
//         res.status(401).send(info);
//       } else {
//         next();
//       }

//       res.status(401).send(info);
//     })(req, res);
//   },

  // function to call once successfully authenticated
  // function (req, res) {
  //   res.status(200).send('logged in!');
  // };

app.get('/', (req, res) => {
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
