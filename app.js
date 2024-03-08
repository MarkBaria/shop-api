const express = require('express');
const app = express();
const studentRoute = require('./api/routes/student');
const facultyRoute = require('./api/routes/faculty');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

mongoose.connect('mongodb+srv://Mark:Markvrushi37@shop.yruuv4n.mongodb.net/?retryWrites=true&w=majority&appName=Shop');

mongoose.connection.on('error',err=>{
    console.log('connection failed');
  });
  
mongoose.connection.on('connected',()=>{
    console.log('connected successfully with database');
  });

  app.use(fileUpload({
    useTempFiles:true
  }))
  
  app.use(bodyParser.urlencoded({extende:false}))
  app.use(bodyParser.json());

app.use('/student',studentRoute);
app.use('/faculty',facultyRoute);


app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request'
    })
})

module.exports=app;