require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error'); //should be relative
const authRoutes = require('./routes/auth');
const teamsRoutes = require('./routes/team');
const db = require("./models");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/teams', teamsRoutes);
// all routes here




// error handler
app.use(function(req,res,next){
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
  console.log(`Server is starting on port ${PORT}`);
});