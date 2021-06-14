const express = require('express');
const router = express.Router();
const User = require('../../models/User')

// @route   Delete api/deleteId
// @desc    Test route
// @access  Public
router.delete(
    '/',
    async (req, res) => {

        const { email } = req.query
        console.log(email)

        try {
            // See if user exists
            let user = await User.deleteOne({ email });
            console.log(user)
            res.status(200).json({message:`Remove ${email} success.`})

        } catch (err) {
            console.error(err.message);
        }

    });

module.exports = router;