const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()

router.post('/api/waitlist', async (req, res) => {
  console.log('Hit the waitlist route', req.body)
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY  // hardcode temporarily
  const MAILCHIMP_AUDIENCE_ID = '1eb8e75c11'
  const MAILCHIMP_DC = 'us6'

  try {
    const response = await fetch(
      `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`, 'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          tags: ['waitlist']
        })
      }
    )

    const data = await response.json()

    if (response.ok) {
      return res.status(200).json({ success: true })
    } else if (data.title === 'Member Exists') {
      return res.status(200).json({ success: true })
    } else {
      return res.status(500).json({ error: data.detail || 'Mailchimp error' })
    }

  } catch (err) {
    console.error('Waitlist error:', err)
    return res.status(500).json({ error: 'Server error, please try again' })
  }
})

module.exports = router