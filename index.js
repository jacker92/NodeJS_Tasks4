const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/poisRouter')

const app = express();
const port = 3000;

app.set('json spaces', 2);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/v1', apiRouter);

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`))

module.exports = app
