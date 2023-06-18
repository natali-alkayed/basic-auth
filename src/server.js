'use strict';
const express = require("express");
const app = express();
const AuthRouter = require('./auth/routes/auth.route');


app.use(express.json());
app.use(AuthRouter);

const notFoundHandler = require('./auth/handlers/404');
const errorHandler = require('./auth/handlers/500');

app.get('/', welcomeHandler);
function welcomeHandler(req, res) {
    res.status(200).send('hi');
}
function start(port) {
    app.listen(port, () => {
        console.log(`server is up and listen on ${port}`)
    });
}
app.use('*', notFoundHandler);
app.use(errorHandler)

module.exports = {
    start: start,
    app: app,
}