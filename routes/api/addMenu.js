const express = require('express')
const router = express.Router()
const Menu = require('../../models/Menu')

// @route   POST api/menu
// @desc    Test route
// @access  Public
router.post(
    '/',
    async (req, res) => {
        const { title, item, link } = req.body
        console.log(title, item, link)

        try {
            // See if menu exists
            let menu = await Menu.findOne({ title })
            if (menu) {
                const isItem = (menu.items.filter((e) => e.item == item)).length
                if (isItem) {
                    res.status(400).json({ message: `${item} already exists` })
                } else {
                    const arr = menu.items
                    arr.push({ item, link })
                    await Menu.updateOne({ title: title }, { items: arr })
                    res.status(200).json({ message: 'Menu add new items successfully' })
                }

            } else {
                menu = new Menu({
                    title,
                    items: [{ item, link }]
                })
                await menu.save()
                res.status(200).json({ message: 'Menu add new title and items successfully' })
            }

        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: 'Server failed' })
        }
    })

module.exports = router