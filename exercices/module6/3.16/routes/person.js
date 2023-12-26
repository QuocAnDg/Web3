const router = require('express').Router()
const Person = require("../models/person")

router.get('/', (request, response, next) => {
    Person
    .find({})
    .then(person=> {
        response.json(person)
    })
    .catch(error => next(error))
})

router.post('/', (request, response, next) => {
    const body = request.body

    if (body.phoneNumber === undefined || body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
    const person = new Person({
        name: body.name,
        phoneNumber: body.phoneNumber,
    })
    person.save().then(result => {
        response.json(result)
    })
    .catch(error => next(error))
})

router.delete('/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

module.exports = router