const { body, query, header, validationResult } = require('express-validator')
const token = require('./tokens.js')

const bodyValidationRules = () => {
    return [
        body('name').exists(),
        body('description').exists(),
        body('city').exists(),
        body('coordinates').exists()
    ]
}

const tokenValidationRules = () => {
    return [
        header('Authorization').custom(value => {
            console.log(value);
            return token.verify(value.split(" ")[1])
        })
    ]
}

const queryValidationRules = () => {
    return [
        query("filter").exists(),
        query("radius").exists(),
        query("lat").exists(),
        query("lng").exists()
    ]
}

const authorizationValidationRules = () => {
    return [
        body('username').exists(),
        body('password').exists()
    ]
}

const validateToken = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(401).json({
        errors: extractedErrors,
    })
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
    tokenValidationRules,
    validateToken,
    queryValidationRules,
    validate,
}