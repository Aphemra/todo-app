const { ValidationError } = require("yup")
const authToken = require("../utils/authToken")

/**
 * A middleware that checks the authorized token and assigns it to `req.user`.
 */
module.exports = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return next(new ValidationError("No token was passed through the Authorization header."))
    }

    const scrubbedAuthorization = authorization.replace(/Bearer\ +/gmi, '')

    try {
        const { user } = authToken.verify(scrubbedAuthorization)
        req.user = user
        next()
    } catch (err) {
        res.status(401).json({
            errors: ["Unauthorized"]
        })
    }
}