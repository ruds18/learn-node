const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json' ));


///////////////////////////////////////////////////
// ROUTES Definition

const getAllTours = (req,res)=>{
    res.json({
      status: 'success',
      results: tours.length,
      data: {
          tours:tours
      }
    })
  };

const getTour =(req,res)=>{
    
  const id = req.params.id*1;
  const tour = tours.find(el=> el.id == id);

   if(!tour){
    return res.status(404).json({
      'status': 'failed',
       'message' : 'Invalid Id'
    })
 }

  res.json({
      status: 'success',
      data: {
          tour
      }
    })
};

const createTour =(req,res)=>{
  //   console.log(req.body);
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

const updateTour = (req,res)=>{
  const id = req.params.id*1;
  

  if(id > tours.length){
      return res.status(404).json({
          'status': 'failed',
           'message' : 'Invalid Id'
        })
  }

  res.status(200).json({
      'status' : "success",
      data:{
         tour: "zfdg"
      }
  })
};

const deleteTour = (req,res)=>{
  // convert id in url into strings
  const id = req.params.id*1;
  // Empty Id
  if(id > tours.length){
      res.status(404).json({
          "status" : "failed",
          "message" : "Invalid Id"
      })
  }
 
 res.status(204).json({
  "status" : "successful",
  data: null

 })

}

///////////////////////////////////////////////////
// ROUTES

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

  

const port =3000;
app.listen(port , ()=>{
    console.log(`App running on port ${port}`);
})