const router = require('express').Router()
const Person = require("../models/person")
const NotFoundError = require('../utils/NotFoundError')
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
    Person
    .find({name: body.name})
    .then(person=> {
        if (person){

        }
        response.json(person)
    })
    .catch(error => next(error))
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
router.put("/:id", (req, res, next) => {
  const body = req.body
  // Check body
  const errorMessages = []
  if (!body.name) errorMessages.push("name must be present")
  if (!body.phoneNumber) errorMessages.push("number must be present")
  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages })
    return
  }
  // Update
  const person = {
    name: body.name,
    phoneNumber: body.phoneNumber,
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        throw new NotFoundError()
      }
    })
    .catch(error => next(error))
})

module.exports = router