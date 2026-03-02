const router = require("express").Router()
const db = require("../database")
const nodemailer = require("nodemailer")

// Get name
router.get("/name", (req, res) => {
  res.json({ name: process.env.GIRLFRIEND_NAME })
})

// Get birthday date
router.get("/birthday-date", (req, res) => {
  res.json({ date: process.env.BIRTHDAY_DATE })
})

// Get all cards
router.get("/cards", (req, res) => {
  db.all("SELECT * FROM cards", [], (err, rows) => {
    if (err) return res.status(500).json(err)
    res.json(rows)
  })
})

// Proposal answer
router.post("/answer", async (req, res) => {
  const { answer } = req.body

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Proposal Answer 💖",
    text: `She answered: ${answer}`
  })

  res.json({ success: true })
})

module.exports = router