const express = require('express');
const AuthRouter = express.Router();
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const {Users} = require('../models/ index');
const basicAuth = require('../middleware/basic');
// app.use(express.urlencoded({ extended: true }));




AuthRouter.post('/signup', async (req, res) => {
    let username = req.body.username;
    let hashedPassword = await bcrypt.hash(req.body.password, 5);
    const record = await Users.create({
        username: username,
        password: hashedPassword
    });
    res.status(201).json(record);
});


// AuthRouter.get('/signin', async (req, res) => {
//     if (req.headers.authorization) {
//         let headersParts = req.headers.authorization.split(" ");
//         let encodedValue = headersParts.pop();
//         let decodedValue = base64.decode(encodedValue);
//         let [username, password] = decodedValue.split(":");
//         const user = await Users.findOne({ where: { username: username } })
//         const validUser = await bcrypt.compare(password, user.password);
//         if (validUser) {
//             res.status(200).json({ user });
//         } else {
//             res.status(500).send("wrong username or password");
//         }

//     } else {
//         console.log('no user name or password')
//     }
// });

     
  


AuthRouter.post('/signin', basicAuth, (req, res) => {
    //res.status(200).json({ users});
  });



 

module.exports = AuthRouter;


//#############################################################################################//












