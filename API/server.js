const dotenv  = require('dotenv')
dotenv.config({path : './config.env'})
const mongoose = require('mongoose');
const app = require('./app');


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex : true,
    useFindAndModify:false,
    useUnifiedTopology: true, 
}).then(() =>{console.log("MongoDB connection successful!!")}).catch((err)=>{console.log(err);})




///////////////////////////////////////////////////
// SERVER

const port =3000;
app.listen(port , ()=>{
    console.log(`App running on port ${port}`);
})
