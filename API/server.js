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
}).then(() =>{console.log("MongoDB connection successful!!")})

const tourScehma = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'A Tour Must have a name'],
        unique:true
    },
    rating:{
        type:Number,
        default:4.5
    },
    price:{
        type:Number,
        required: [true, ' A Tour must have a price']
    }
})

const Tour = mongoose.model('Tour', tourScehma);
const testTour = new Tour({
    name: 'The parv Hiker',
    rating:4.7,
    price: 497
});
testTour.save().then(doc =>{
    console.log(doc);  
}).catch(err =>{
    console.log('ERROR 💣:', err)
})

///////////////////////////////////////////////////
// SERVER

const port =3000;
app.listen(port , ()=>{
    console.log(`App running on port ${port}`);
})
