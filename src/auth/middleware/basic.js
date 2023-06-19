const express = require('express');
const AuthRouter = express.Router();
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const {Users} = require('../models/ index');


const basicAuth = async (req, res, next) => {
    if (req.headers.authorization) {
      let headersParts = req.headers.authorization.split(" ");
      //console.log(req.headers.authorization);
      let encodedValue = headersParts.pop();
      let decodedValue = base64.decode(encodedValue);
      //console.log(encodedValue);
      let [username, password] = decodedValue.split(":");
      try{
      const user = await Users.findOne({ where: { username: username } })
      const validUser = await bcrypt.compare(password, user.password);
      if (validUser) {
       // next();
       res.status(200).json({ user });
      } else {
        throw new Error("Unauthorized: Invalid username or password");
      }
    } 
      catch (error) { res.status(403).send('Invalid Login'); }
  };}

module.exports=basicAuth;




