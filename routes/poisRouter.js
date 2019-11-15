const express = require('express');
const router = express.Router();
const db = require('../db.js')
const validator = require('../query_validator')
const haversine = require('haversine-js')

router.get('/', (req, res, next) => {
    if (!req.query) {
        res.status(200).send(db.getPoi());
    } else {
        if (req.query["filter"] === "radius") {
            next();
        }
    }

}, validator.queryValidationRules(), validator.validate, (req, res) => {
    let pois = db.getPoi();
    let radius = req.query["radius"];
    let array = [];

    for (let index = 0; index < pois.length; index++) {
        const element = pois[index];
        const first = {
            latitude: element.coordinates.lat,
            longitude: element.coordinates.lng
        }

        const second = {
            latitude: req.query["lat"],
            longitude: req.query["lng"]
        }

        const options = {
            radius: haversine.EARTH.KM
        };

        let result = haversine(first, second, options).toFixed(0);

        if (result <= radius) {
            array.push(element);
        }
    }
    res.status(200).send(array);
});

router.get('/:id', (req, res) => {
    let poi = db.getPoi(req.params.id);
    if (poi) {
        res.status(200).send(poi);
    } else {
        res.status(404).send();
    }
});

router.post('/', validator.tokenValidationRules(),
    validator.validateToken,
    validator.bodyValidationRules(),
    validator.validate, (req, res) => {
        let poi = db.createPoi(req.body);
        res.status(201).send(req.body);
    });

router.put('/:id', validator.tokenValidationRules(),
    validator.validateToken,
    validator.bodyValidationRules(),
    validator.validate, (req, res) => {
        let poiExists = db.getPoi(req.params.id);
        let poi = db.setPoi(req.params.id, req.body);

        if (poiExists) {
            res.status(200).send(poi);
        } else {
            res.status(201).send(poi);
        }
    });

router.delete('/:id', validator.tokenValidationRules(),
    validator.validateToken, (req, res) => {
        let poi = db.deletePoi(req.params.id);
        if (poi) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    });

module.exports = router
