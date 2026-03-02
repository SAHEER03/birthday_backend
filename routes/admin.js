const router = require("express").Router()
const db = require("../database")

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    return res.json({ success: true })
  }

  res.status(401).json({ success: false })
})

// Add card
router.post("/card", (req, res) => {
  const { note } = req.body

  db.run("INSERT INTO cards (note) VALUES (?)", [note], function (err) {
    if (err) return res.status(500).json(err)

    res.json({ id: this.lastID, note })
  })
})

// Edit card
router.put("/card/:id", (req, res) => {
  const { note } = req.body

  db.run(
    "UPDATE cards SET note = ? WHERE id = ?",
    [note, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err)
      res.json({ success: true })
    }
  )
})

module.exports = router