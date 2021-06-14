const express = require('express')
const app = express()
const connectDB = require('./config/db')
app.use(express.static(__dirname + '/public'));
app.use(express.json({
    extended: false
}))

connectDB()

// Menu
app.use('/api/addMenu', require('./routes/api/addMenu'))
app.use('/api/getMenu', require('./routes/api/getMenu'))
app.use('/api/updateMenu', require('./routes/api/updateMenu'))
app.use('/api/deleteMenu', require('./routes/api/deleteMenu'))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))