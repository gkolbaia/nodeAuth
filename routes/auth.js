const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const { registerValidation } = require('../validation');
const bcrypt = require('bcryptjs')


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
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
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

router.get('/login', (req, res) => {

});

module.exports = router;