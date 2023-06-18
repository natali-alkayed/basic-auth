const express = require('express');
const AuthRouter = express.Router();
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const {Users} = require('../models/ index');


const basicAuth = async (req, res, next) => {
    if (req.headers.authorization) {
      let headersParts = req.headers.authorization.split(" ");
      let encodedValue = headersParts.pop();
      let decodedValue = base64.decode(encodedValue);
      let [username, password] = decodedValue.split(":");
      const user = await Users.findOne({ where: { username: username } })
      const validUser = await bcrypt.compare(password, user.password);
      if (validUser) {
       // next();
       res.status(200).json({ user });
      } else {
        res.status(401).send("Unauthorized: Invalid username or password");
      }
    } else {
      res.status(401).send("Unauthorized: No username or password provided");
    }
  };

module.exports=basicAuth;