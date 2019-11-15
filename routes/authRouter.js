const express = require('express');
const router = express.Router();
const validator = require('../query_validator')
const validateCreds = require('../mockAccountRepository')
const token = require('../tokens')

router.post('/', validator.authorizationValidationRules(), validator.validate, (req, res) => {
    if (validateCreds(req.body.username, req.body.password)) {
       res.status(200).send(token.create(req.body.username));
    }
    res.status(401).send();
});

module.exports = router