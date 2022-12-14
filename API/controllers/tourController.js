const { findByIdAndDelete } = require('./../models/tourModel');
const Tour = require('./../models/tourModel');


exports.getAllTours = async(req,res)=>{

   try{
    //Filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete(queryObj[el]) )
    console.log(req.query, queryObj);

     //Advanced Filtering
     let queryStr = JSON.stringify(queryObj);
     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`)
     console.log(JSON.parse(queryStr));

     //Sorting
     let query = Tour.find(JSON.parse(queryStr));
     if(req.query.sort){
      const SortBy = req.query.sort.split(',').join(' ');
      query = query.sort(SortBy) 
     }else{
     query =  query.sort('-createdAt')
     }


    // const tours = await Tour.find();

    //Field Limiting
    if(req.query.fields){
      const fields =req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }
    else{
      query = query.select('-__v');
    }
   
    //Pagination
    const page = req.query.page*1 || 1; 
    const limit = req.query.limit*1 || 10;
    const skip = (page -1)* (limit);

    query = query.skip(skip).limit(limit);

    if(req.query.page){
      const numTours   = await Tour.countDocuments();
      if(skip >= numTours) throw new err("Page Does Not exists!")
    }
   
    //Execute Query
    const tours = await query

    // Send response
    res.json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    })
   } catch (err){
    res.status(404).json({
      status: "failed",
      message : err
    })
   }
  };



exports.getTour = async(req,res)=>{
  try{
     const tour = await Tour.findById(req.params.id);
     res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })

  } catch (err){
    res.status(404).json({
      status: "failed",
      message : err
    })
   }
};

exports.createTour = async(req,res)=>{
  try{
    const newTour =  await Tour.create(req.body);

    res.status(201).json({
      status:'success',
      data:{
          tour:newTour
      }
  });
  } catch (err){
   res.status(400).json({
    status: "falied",
    message: err
   })
  }
  
}

exports.updateTour = async(req,res)=>{
  try{
  
    const tour =  await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
     })
   
  res.status(200).json({
    'status' : "success",
    data:{
        tour
    }
    })
     
    }catch (err){
    res.status(400).json({
      status: "falied",
      message: err
       })
  }  
};

exports.deleteTour = async(req,res)=>{
 try{
   await Tour.findByIdAndDelete(req.params.id);
   res.status(204).json({
      status : "success",
      data : null
   })
 }catch (err){
  res.status(404).json({
    status : "failed",
    data : err
 })
 }

}