const express = require('express');
const router = express.Router();
const Menu = require('../../models/Menu')

// @route   Delete api/deleteMeun
// @desc    Test route
// @access  Public
router.delete(
    '/',
    async (req, res) => {
        let { title, item } = req.body;
        try {
            let menu = await Menu.findOne({ title });
            if (menu && item) {
                const items = menu['items']
                const removeItem = items.filter(e => e.item !== item)
                await Menu.updateOne({ title: title }, { items: removeItem });
                res.status(200).json({ message: `Remove ${item} successfully.` })
            } else if (menu) {
                await Menu.deleteOne({ title });
                res.status(200).json({ message: `Remove ${title} successfully.` })
            } else {
                res.status(400).json({ message: `Remove title or item is null.` })
            }

        } catch (err) {
            console.error(err.message);
        }

    });

module.exports = router;