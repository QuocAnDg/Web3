const express = require('express')

const app = express()
app.use(express.json())
const PhoneBook = require('./models/phoneBook')

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/phoneBook', (request, response) => {
    PhoneBook
    .find({})
    .then(phonesBook=> {
        response.json(phonesBook)
    })
})

app.post('/api/phoneBook', (request, response) => {
    const body = request.body

    if (body.phoneNumber === undefined || body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
    const phoneBook = new PhoneBook({
        name: body.name,
        phoneNumber: body.phoneNumber,
    })
    phoneBook.save().then(result => {
        response.json(result)
    })
})

app.delete('/api/phoneBook/:id', (request, response, next) => {
    PhoneBook.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
  })
