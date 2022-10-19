const { ValidationError } = require("yup")

/**
 * A middleware that intercepts the ValidationErrors from yup and spits them out in an acceptable JSON format.
 */
module.exports = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        const { type, errors } = err
        res.status(400).json({
            type, errors
        })
    } else {
        next(err)
    }
}