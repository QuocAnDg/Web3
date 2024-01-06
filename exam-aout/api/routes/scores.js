const router = require('express').Router()
const Score = require("../models/score")
const Joke = require('../models/joke');

router.get("/", (req, res, next) => {
    Score.find({})
      .then(joke => res.json(joke))
      .catch(err => next(err))
})

// Insert one
router.post("/", async (req, res, next) => {
    const body = req.body;
    // Check body
    const errorMessages = [];
  
    // Validate minimum length for username
    if (!body.username || body.username.length < 3) {
      errorMessages.push("username must be present and have at least 3 characters");
    }
  
    if (!body.date) {
      errorMessages.push("date must be present");
    }
  
    // Validate score range
    if (!body.score || body.score < 0 || body.score > 10) {
      errorMessages.push("score must be present and be between 0 and 10");
    }
  
    if (!body.joke) {
      errorMessages.push("joke must be present");
    } else {
      // Check if the associated joke exists in the database
      try {
        const existingJoke = Joke.findById(body.joke);
        if (!existingJoke) {
          errorMessages.push("The associated joke does not exist in the database");
        }
      } catch (err) {
        next(err);
        return;
      }
  
      // Check if the user has already given a score to this joke
      try {
        const existingScore = await Score.findOne({ username: body.username, joke: body.joke });
        if (existingScore) {
          errorMessages.push("The user has already given a score to this joke");
        }
      } catch (err) {
        next(err);
        return;
      }
    }
  
    // If there are validation errors, return a 422 response
    if (errorMessages.length > 0) {
      res.status(422).json({ errorMessages });
      return;
    }
  
    // If all validations pass, create and save the score
    const score = new Score(body);
    score.save()
      .then(result => {
        res.json(result);
      })
      .catch(err => next(err));
  });
  

module.exports = router