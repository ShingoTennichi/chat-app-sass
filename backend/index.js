const http = require('http');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require("./model/schema");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Content-Type', 'application/json');


  if (req.method === 'GET') {

    if (req.url == "/") {
      res.statusCode = 200;
      res.end(JSON.stringify({ "a": "json" }));
    }

  } else if (req.method === 'POST') {

    if (req.url == "/sign-up") {
      signUp(req, res);
    } else if (req.url == "/sign-in") {
      signIn(req, res);
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: 'Bad Request' }))
      return;
    }

  } else if (req.method === 'PUT') {

  } else if (req.method === 'DELETE') {

  } else {

    res.statusCode = 200;
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

function signUp(req, res) {
  // get body as string
  const body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  })
    .on('end', async () => {
      const result = Buffer.concat(body).toString();
      const jsonBody = JSON.parse(result);
      const { fName, lName, email, password } = jsonBody;

      const findUser = await User.find({ email: email })

      // error: user exist
      if (findUser.length) {

        res.statusCode = 400;
        res.end(JSON.stringify(createResponse(400, "user already exist")));
        return;
      }

      // hashing password then create user
      const saltRounds = 5;
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const createUser = await User.create({
          fName: fName,
          lName: lName,
          email: email,
          password: hash
        });

        res.statusCode = 200;
        res.end(JSON.stringify(createResponse(200, "successfully created", createUser)));
      });
    })
}

function signIn(req, res) {
  const body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  })
    .on('end', async () => {

      const result = Buffer.concat(body).toString();
      const jsonBody = JSON.parse(result);
      const { email, password } = jsonBody;

      const findUser = await User.findOne({ email: email });

      console.log(null === findUser);
      if (findUser) {
        console.log("findUser", findUser);
        bcrypt.compare(password, findUser.password, (err, result) => {
          if (result) {
            res.end(createResponse(200, 'successfully login', findUser));
          } else {
            res.end(createResponse(400, 'make sure input is correct', {}));
          }
        });

      } else {
        res.end(createResponse(400, 'make sure input is correct', {}));
      }
    });
}

function createResponse(status = 200, message = "", body = {}) {
  const response = {
    data: {
      status: status,
      message: message,
      body: body
    }
  }
  return JSON.stringify(response);
}