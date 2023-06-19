const express = require('express');
const AuthRouter = express.Router();
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const {Users} = require('../models/ index');
const basicAuth = require('../middleware/basic');
// app.use(express.urlencoded({ extended: true }));




AuthRouter.post('/signup', async (req, res) => {
    try{
    let username = req.body.username;
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create({
        username: username,
        password: hashedPassword
    });
    res.status(200).json(record);
} catch (e) { res.status(403).send('Error Creating User'); }
});




AuthRouter.post('/signin', basicAuth, (req, res) => {
    //res.status(200).json({ users});
  });



 

module.exports = AuthRouter;


//#############################################################################################//


  










