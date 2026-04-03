require('dotenv').config()
const express = require('express')
const cors = require('cors')
const waitlist = require('./waitlist')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(waitlist)

app.get('/', (req, res) => {
  res.send('Pantrify backend is running')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})