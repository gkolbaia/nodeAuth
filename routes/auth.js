const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const { registerValidation } = require('../validation');
const { loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


require('../model/User');



const UserModel = mongoose.model('User');
router.post('/register', async (req, res) => {
    const validation = registerValidation(req.body);
    if (validation.error) {
        res.status(400).send({ message: validation.error.details[0].message })
    } else {
        const emailExists = await UserModel.findOne({ email: req.body.email });
        if (emailExists) {
            return res.status(400).send({ message: 'Email already exists' })
        };
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        try {
            const savedUser = await user.save();
            res.status(200).send(savedUser)
        } catch (err) {
            res.status(400).send(err)
        }
    }

});

router.post('/login', async (req, res) => {
    const validation = loginValidation(req.body);
    if (validation.error) {
        return res.status(400).send({ message: validation.error.details[0].message })
    };
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(req.body.email)
    if (!user) { return res.status(400).send({ message: 'email does not exists' }) };
    var validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) { return res.status(400).send({ message: 'invalid password' }) };
    const token = jwt.sign({ _id: user._id }, 'secret key');
    res.header('auth-token', token).send(token);
    // res.status(200).send(user);
});

module.exports = router;