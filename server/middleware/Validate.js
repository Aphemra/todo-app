const { isSchema } = require("yup")

/**
 * A middleware that checks the `req.body` against a Yup schema.
 * @param {Yup Schema} schema The Yup schema to validate the request.body against.
 */
module.exports = (schema) => {
    if (!isSchema(schema)) {
        throw new Error("The provided schema is not valid.")
    }
    return async (req, res, next) => {
        try {
            await schema.validate(req.body)
            next()
        } catch (err) {
            next(err)
        }
    }
}