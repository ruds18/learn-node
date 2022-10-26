const fs = require('fs');
const http = require('http');
const { parse } = require('path');
const url = require('url');

///////////////////////////////////////////////////////////
// FILES

//Synchronus way
// const text = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(text);

// const textOut = `this is what we know about avacado - ${text}.\n on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);

// console.log('File writen!');

// ASYNC Way
// fs.readFile('./txt/startt.txt', 'utf-8' ,(err,data1)=>{
//     if(err) return console.log("ERROR!!! 🤯");
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8' ,(err,data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8' ,(err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err=>{
//               console.log('Your file has been written 😀');
//             } )
//           } );
//       } );
// } );

// console.log("next file reading");

///////////////////////////////////////////////////////////
// SERVER

//SYNC
// const data = fs.readFile('./dev-data/data.json', 'utf-8', (err, data)=>{console.log(data)});
// const dataObj = JSON.parse(data);


// ASYNC
 http.createServer(function(req,res) {
    
    const pathName = req.url;

    if( pathName == '/' || pathName == '/overview'){
       return res.end("Overview Page");
    }else if(pathName == '/about'){
        res.end("About Page");
    }else if(pathName == '/api'){
        //This is read every time when the user makes the call therefore it should be sync
        fs.readFile('./dev-data/data.json' , 'utf-8' , (err, data)=>{
            const productData = JSON.parse(data);
            res.writeHead(200, {'Content-type': 'application/json'})
            res.end(data);
        });
        // res.writeHead(200, {'Content-type': 'application/json'});
        // res.end(data);
    }
    else{
        res.end("Url Enetered does not exists");
    }

}).listen(8081 , ()=>{console.log("Server Running at 8081!")});

// server.listen(8002, '127.0.0.1', (err)=>{
    
//     console.log("Server running on 8000!");
// });

