require('dotenv').config();
const PORT = 3000;
const express = require('express');
const app = express();
const apiRouter = require('./api');
app.use('/api', apiRouter);



const { client } = require('./db');
client.connect();

app.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});


app.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});



app.use('/api', (req, res, next) => {
  console.log("A request was made to /api");
  next();
});

app.get('/api', (req, res, next) => {
  console.log("A get request was made to /api");
  res.send({ message: "success" });
});

// app.get('/background/:color', (req, res, next) => {
//   res.send(`
//     <body style="background: ${ req.params.color };">
//       <h1>Hello World</h1>
//     </body>
//   `);
// });

// app.get('/add/:first/to/:second', (req, res, next) => {
//   res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
//     Number(req.params.first) + Number(req.params.second)
//   }</h1>`);
// });