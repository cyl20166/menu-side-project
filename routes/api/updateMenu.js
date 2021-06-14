const express = require('express');
const router = express.Router();
const Menu = require('../../models/Menu')

// @route   Update api/updateMenu
// @desc    Test route
// @access  Public
router.put(
    '/',
    async (req, res) => {
        let { title, item, newUrl } = req.body;
        try {
            let menu = await Menu.findOne({ title });
            const isItem = (menu.items.filter((e) => e.item == item)).length
            if (menu && isItem) {
                const items = menu['items']
                const newItem = items.map((i) => {
                    const arr = []
                    if (i.item === item) {
                        i.link = newUrl
                    }
                    arr.push(i)
                    return i
                })
                await Menu.updateOne({ title: title }, { items: newItem });
                res.status(200).json({ message: `Update ${item} to ${newUrl} successfully.` })
            } else {
                res.status(400).json({ message: `Update ${item} to ${newUrl} failed.` })
            }

        } catch (err) {
            console.error(err.message);
        }

    });

module.exports = router;