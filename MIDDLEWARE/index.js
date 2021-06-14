const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

const postRouter = require('./posts')

// Top Level Middleware


app.use((req, res, next) => {
  console.log(req.method,'----Request arrived---', req.url)
  next() // move to next route that matches

})



app.use((req,res,next) => {
  console.log('Trying to add secret')
  if(req.body){
    console.log('Adding 42')
    req.body.secret = 42
  }
  next()
})



app.use(bodyParser.json());
app.use(express.json());
//same as above but using Morgan logging middleware
app.use(morgan('dev'));

//Allowing router to handle posts requests
app.use('/posts', postRouter)


const getMiddleware = (req, res, next) => { 
  console.log('------Route level middleware')
  if(req.query.isAdmin){
    next()
  }else{
    res.send('Unauthorized')
  } // move on to next route function
}


// Route Specific Middleware

const anotherGetMiddleware = (req, res, next) => {
  console.log('Even MORE!!!')
  next()
}

app.get('/api', getMiddleware, anotherGetMiddleware, (req, res, next) => {

  res.send('Hello')
})



app.post('/api/users', (req, res) => {
    console.log(req.body)
  res.send('Posted!')
})

app.listen(3000, () => {
  console.log('Server has started on port 3000')
})

