const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    }
    if (error instanceof NotFoundError) {
      return res.status(404).end()
    }
    next(error)
}

exports.errorHandler = errorHandler  