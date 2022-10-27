const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json' )) 

app.get('/api/v1/tours', (req,res)=>{
  res.json({
    status: 'success',
    results: tours.length,
    data: {
        tours:tours
    }
  })
})

app.post('/api/v1/tours', (req,res)=>{
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
});

app.get('/api/v1/tours/:id', (req,res)=>{
    
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
  })

  app.patch('/api/v1/tours/:id', (req,res)=>{
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
  })

  app.delete('/api/v1/tours/:id', (req,res)=>{
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

  })

  

const port =3000;
app.listen(port , ()=>{
    console.log(`App running on port ${port}`);
})