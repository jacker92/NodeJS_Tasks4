const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/poisRouter')
const authRouter = require('./routes/authRouter')

const app = express();
const port = 3000;

app.set('json spaces', 2);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/pois', apiRouter);
app.use('/api/v1/auth', authRouter);

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`))

module.exports = app
