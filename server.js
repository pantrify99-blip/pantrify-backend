require('dotenv').config()
const express = require('express')
const cors = require('cors')
const waitlist = require('./waitlist')

const app = express()

app.use(cors({
  origin: '*' // we'll lock this to your domain once the site is live
}))

app.use(express.json())
app.use(waitlist)

// basic health check so you can confirm the server is running
app.get('/', (req, res) => {
  res.send('Pantrify backend is running')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})