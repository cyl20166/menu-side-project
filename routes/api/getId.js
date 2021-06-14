const express = require('express');
const router = express.Router();
const User = require('../../models/User')

// @route   GET api/getUser
// @desc    Test route
// @access  Public
router.get(
    '/',
    async (req, res) => {
        const { email } = req.query
        try {
            // See if user exists
            let user = await User.findOne({ email });
            console.log(user)
            res.status(200).json({name:user.name,date:user.date})

        } catch (err) {
            console.error(err.message);
        }

    });

module.exports = router;