const express = require('express')
const router = express.Router()

// Router Middleware


router.use((req, res, next) => {
  console.log('Inside /posts middleware')
  next()


})





//post
router.get('/', (req, res,next) => {
  res.json([{ id: 1, content: 'First pose'}])
})


module.exports = router