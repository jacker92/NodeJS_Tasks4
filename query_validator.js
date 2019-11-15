const { body, validationResult } = require('express-validator')
const bodyValidationRules = () => {
    return [
        body('name').exists(),
        body('description').exists(),
        body('city').exists(),
        body('coordinates').exists()
    ]
}

const authorizationValidationRules = () => {
    return [
        body('username').exists(),
        body('password').exists()
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

module.exports = {
    bodyValidationRules,
    authorizationValidationRules,
    validate,
}