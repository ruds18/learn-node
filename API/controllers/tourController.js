const fs = require('fs');

//SYNC
const tours = JSON.parse(fs.readFileSync('././dev-data/data/tours-simple.json' ));

// will run only on id 
exports.checkId = (req,res,next,val) =>{
  if(req.params.id*1 > tours.length){
    return res.status(404).json({
        "status" : "failed",
        "message" : "Invalid Id"
    })
}
  next();
}


exports.getAllTours = (req,res)=>{
    res.json({
      status: 'success',
      requestedAt : req.responseTime,
      results: tours.length,
      data: {
          tours:tours
      }
    })
  };

  exports.checkBody = (req,res,next) =>{
      if(!req.body.name || !req.body.price){
        return res.status(404).json({
          status : " failed",
          message : "Missing name or price"
        })
      }
      next();
  }

exports.getTour =(req,res)=>{
    
  const tour = tours.find(el=> el.id == req.params.id*1);

  res.json({
      status: 'success',
      data: {
          tour
      }
    })
};

exports.createTour =(req,res)=>{
    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id: newId}  , req.body);
    tours.push(newTour);
    fs.writeFile('./dev-data/data/tours-simple.json',JSON.stringify(tours) , err=>{
      res.status(201).json({
          status:'success',
          data:{
              tour:newTour
          }
      })
    })
}

exports.updateTour = (req,res)=>{
  res.status(200).json({
      'status' : "success",
      data:{
         tour: "zfdg"
      }
  })
};

exports.deleteTour = (req,res)=>{
 res.status(204).json({
  "status" : "successful",
  data: null
 })

}