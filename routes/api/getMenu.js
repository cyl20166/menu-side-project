const express = require('express');
const router = express.Router();
const Menu = require('../../models/Menu')

// @route   GET api/getMenu
// @desc    Test route
// @access  Public
router.get(
    '/',
    async (req, res) => {
        try {
            let menu = await Menu.find();
            console.log(menu)
            res.status(200).json(menu)
        } catch (err) {
            console.error(err.message);
            res.status(400).json({ message: 'Get menu failed' })
        }
    });

module.exports = router;