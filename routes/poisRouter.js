const express = require('express');
const router = express.Router();
const db = require('../db.js')
const validator = require('../query_validator')

router.get('/pois', (req, res) => {
    res.status(200).send(db.getPoi());
});

router.post('/pois', validator.bodyValidationRules(), validator.validate, (req, res) => {
    let poi = db.createPoi(req.body);
    res.status(201).send(req.body);
});

router.get('/pois/:id', (req, res) => {
    let poi = db.getPoi(req.params.id);
    if (poi) {
        res.status(200).send(poi);
    } else {
        res.status(404).send();
    }
});

router.put('/pois/:id', validator.bodyValidationRules(), validator.validate, (req, res) => {
    let poiExists = db.getPoi(req.params.id);
    let poi = db.setPoi(req.params.id, req.body);

     if (poiExists) {
        res.status(200).send(poi);
    } else {
        res.status(201).send(poi);
    }
});

router.delete('/pois/:id', (req, res) => {
    let poi = db.deletePoi(req.params.id);
    if (poi) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = router
