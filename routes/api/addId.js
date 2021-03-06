const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')

// @route   POST api/user
// @desc    Test route
// @access  Public
router.post(
    '/', [
        check('name', 'Name is required')
        .not()
        .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'please enter a password with 6 or more characters'
        ).isLength({ min: 6 })
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log(req.body)

        const { name, email, password } = req.body;

        try {
            // See if user exists
            let user = await User.findOne({ email });
            console.log(user)

            if (user) {
                res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            // Encrypt password
            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // Return jsonwebtoken

            res.send('User registered');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
        // User.findOne()
    });

module.exports = router;