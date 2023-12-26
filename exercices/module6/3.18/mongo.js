const mongoose = require('mongoose')
const express = require('express')
const {MONGODB_URI, PORT} = require('./utils/config')
const phonebookRouter = require('./routes/person')
const middleware = require("./utils/middleware")

mongoose.connect(MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const app = express()

app.use(express.json())
app.use('/api/persons', phonebookRouter)
app.use(middleware.errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })


