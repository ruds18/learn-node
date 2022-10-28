const express = require('express');
const app = express();
const morgan = require('morgan');

// Routes Handelers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));
app.use((req,res,next)=>{
  req.responseTime = new Date().toISOString();
  next();
})
app.use(express.static('./public'));

// Mounting Routers
// Base Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users' , userRouter);




module.exports = app;