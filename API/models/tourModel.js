const mongoose = require('mongoose');

const tourScehma = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'A Tour must have a name'],
        unique:true,
        trim: true
    },
    duration: {
        type: Number,
        required : [true, 'A Tour must have a duration']
    },
    maxGroupSize :{
        type: Number,
        required : [true, 'A Tour must have a group size']
    },
    difficulty :{
        type: String,
        required : [true, 'A Tour must have a difficulty']
    },
    ratingAverage:{
        type:Number,
        default:2.5
    },
    ratingQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required: [true, ' A Tour must have a price']
    },
    priceDiscount:{
        type:Number
    },
    summary:{
        type: String,
        trim: true,
        required:[true, 'A Tour must have a summary']
    },
    description :{
        type: String,
        trim :true
    },
    imageCover:{
      type:String,
      require: [true, ' A Tour must have a image']
    },
    images : {
        type: [String]
    },
    createdAt :{
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates :   [Date] ,
})

const Tour = mongoose.model('Tour', tourScehma);

module.exports = Tour