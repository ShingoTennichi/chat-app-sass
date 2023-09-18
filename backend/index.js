const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require("./model/schema");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);
  if (req.method === 'GET') {
    if (req.url == "/") {
      res.statusCode = 200;
      res.setHeader('Access-Control-Allow-Origin', "*");
      res.setHeader('Content-Type', 'text/html');
      res.end(JSON.stringify({ "a": "json" }));
    }
  } else if (req.method === 'POST') {
    if (req.url == "/sign-up") {
      // get body as string
      const body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      })
        .on('end', () => {
          const result = Buffer.concat(body).toString();
          const jsonBody = JSON.parse(result);
          const { fName, lName, email, password } = jsonBody.data;

          //todo:error handling

          //todo:password hashing

          User.create({
            fName: fName,
            lName: lName,
            email: email,
            password: password
          })
            .then((data) => {
              console.log(data);
            })

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            data: {
              result: result
            }
          }));
        })

    }
  } else if (req.method === 'PUT') {

  } else if (req.method === 'DELETE') {

  } else {
    res.statusCode = 400;
    res.end("Bad Request")
  }

});

server.listen(port, hostname, () => {
  mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
      console.log(`database connected: ${process.env.DATABASE_URL}`);
    })

  console.log(`Server running at http://${hostname}:${port}/`);
});