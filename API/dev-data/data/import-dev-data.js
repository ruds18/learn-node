const fs = require('fs')
const dotenv  = require('dotenv')
dotenv.config({path : './config.env'})
const mongoose = require('mongoose');
const Tour  = require('./../../models/tourModel')


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex : true,
    useFindAndModify:false,
    useUnifiedTopology: true, 
}).then(() =>{console.log(" Import  MongoDB server connection successful!!")}).catch((err)=>{console.log(err);})

// Read JSON file 
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8'));

//Import Data into Db
const importData = async()=>{
    try{
       await Tour.create(tours);
       console.log("DATA Loaded!");
       process.exit();
    }catch (err){
        console.log(err)
    }
}

// Delete All data form Db
const deleteData = async()=>{
    try{
        await Tour.deleteMany();
        console.log("Data Deleted Successfully!");
        process.exit();
    }catch(err){
        console.log(err)
    }
}
if(process.argv[2] == '--import'){
    importData();
 
}else if(process.argv[2] == '--delete'){
    deleteData();
}

console.log(process.argv);