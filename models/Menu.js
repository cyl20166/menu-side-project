const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    items: {
        type: Object,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('menus', MenuSchema);