const express = require('express');
const router = express.Router();
const User = require('../../models/User')

// @route   Delete api/deleteUser
// @desc    Test route
// @access  Public
router.put(
    '/',
    async (req, res) => {

        const { email, newName } = req.query
        console.log(email, newName)

        try {
            await User.updateOne({ email: email }, { name: newName });
            res.status(200).json({ message: `Update ${newName} success.` })

        } catch (err) {
            console.error(err.message);
        }

    });

module.exports = router;