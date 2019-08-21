const express = require('express');
const volleyball = require('volleyball');   // reuqesrts Loging
const cors = require('cors');              // allowing client service acces

require('dotenv').config();

const app = express();

const middlewares = require('./auth/middlewares');
// const auth = require('./auth/index.js');
// const auth = require('./auth/index');
const auth = require('./auth');
const notes = require('./api/notes');

app.use(volleyball);
app.use(cors({
  origin: 'http://localhost:8080' // The client address
}));

app.use(express.json()); // Our Body Parser

app.use(middlewares.checkTokenSetUser); //Using middle ware that checks Header and token for every incomming reques

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨Hello World! 🌈✨🦄',
    user: req.user,
  });
});

app.use('/auth', auth); //Sign in/up Authentication rout 

app.use('/api/v1/notes', middlewares.isLoggedIn, notes);

function notFound(req, res, next) {   //Not found handler
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) { // Error Handler
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});
