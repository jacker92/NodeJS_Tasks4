const express = require('express');
const router = express.Router();
const db = require('../db.js')
const validate = require('../query_validator')

router.get('/pois', (req, res) => {
    res.status(200).send(db.getPoi());
});

router.post('/pois', (req, res) => {
    validate(req,res);
    if (req.body) {
        let poi = db.createPoi(req.body);
        res.status(201).send(req.body);
    } else {
        res.status(400).send();
    }
});

router.get('/pois/:id', (req, res) => {
    let poi = db.getPoi(req.params.id);
    if (poi) {
        res.status(200).send(poi);
    } else {
        res.status(404).send();
    }
});

router.put('/pois/:id', (req, res) => {
    console.log(req.body);
    let poiExists = db.getPoi(req.params.id);
    let poi = db.setPoi(req.params.id, req.body);

    if (!poi) {
        res.status(400).send();
    } else if (poiExists) {
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
