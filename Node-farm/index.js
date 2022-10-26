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

const replaceTemplate = (temp, product) =>{
    let output = temp.replace(/{%productName%}/g,product.productName );
    output = output.replace(/{%Id%}/g,product.id );
    output = output.replace(/{%Image%}/g,product.image );
    output = output.replace(/{%Price%}/g,product.price );
    output = output.replace(/{%From%}/g,product.from );
    output = output.replace(/{%ProductNutrientsName%}/g,product.nutrients );
    output = output.replace(/{%Quantity%}/g,product.quantity );
    output = output.replace(/{%productDiscription%}/g,product.discription );

    if(!product.organic) output = output.replace(/{%NotOrganic%}/g, 'not-organic');

    return output;
}

//SYNC
const data = fs.readFileSync('./dev-data/data.json', 'utf-8', (err, data)=>{console.log(data)});
const dataObj = JSON.parse(data);
const tempOverview  =fs.readFileSync('./templates/overview.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/product.html' , 'utf-8');


// ASYNC
 http.createServer(function(req,res) {
    
   
    const {query, pathname} = url.parse(req.url, true);
   
    console.log(url.parse(req.url, true));
 
    
    // Over-view Page
    if( pathname == '/' || pathname == '/overview'){
        res.writeHead(200, {'Content-type' : 'text/html'})

       const cardHtml = dataObj.map(elememt => replaceTemplate(tempCard,elememt)).join('');
       const output = tempOverview.replace('{%ProductCards%}', cardHtml)
   
       return res.end(output);

    // Products
    }else if(pathname == '/product'){
           
    console.log("Inside call")
    console.log(pathname);
    console.log(query);
        const product = dataObj[query.id];
        res.writeHead(200, {'Content-type': 'text/html'});
        // console.log(query);
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

    // API
    }else if(pathname == '/api'){
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    }

    // Wrong URL
    else{
        res.end("Url Enetered does not exists");
    }

}).listen(8081 , ()=>{console.log("Server Running at 8081!")});

// server.listen(8002, '127.0.0.1', (err)=>{
    
//     console.log("Server running on 8000!");
// });

