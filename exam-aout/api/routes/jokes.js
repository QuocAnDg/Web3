const router = require('express').Router()
const Joke = require("../models/joke")

router.get("/", (req, res, next) => {
    Joke.find({})
      .then(joke => res.json(joke))
      .catch(err => next(err))
})


// Find by ID
router.get("/:id", (req, res, next) => {
    Joke.findById(req.params.id).then(joke => {
    if (joke) {
      res.json(joke)
    } else {
      throw new NotFoundError()
    }
  }).catch(err => next(err))
})

// Delete one
router.delete("/:id", (req, res, next) => {
    Joke.findByIdAndRemove(req.params.id).then(result => {
      if (result) {
        res.json(result)
      } else {
        throw new NotFoundError()
      }
    })
      .catch(err => next(err))
  });

// Insert one
router.post("/", (req, res, next) => {
    const body = req.body;
    console.log(body);
  
    // Check body
    const errorMessages = [];
  
    // Validate minimum length for question, answer, and category
    if (!body.question || body.question.length < 3) {
      errorMessages.push("question must be present and have at least 3 characters");
    }
  
    if (!body.answer || body.answer.length < 3) {
      errorMessages.push("answer must be present and have at least 3 characters");
    }
  
    if (!body.category || body.category.length < 3) {
      errorMessages.push("category must be present and have at least 3 characters");
    }
  
    // If there are validation errors, return a 422 response
    if (errorMessages.length > 0) {
      res.status(422).json({ errorMessages });
      return;
    }
  
    // If all validations pass, create and save the joke
    const joke = new Joke(body);
    joke.save()
      .then(result => {
        res.json(result);
      })
      .catch(err => next(err));
  });
  

module.exports = router