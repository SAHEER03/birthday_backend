const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./birthday.db", (err) => {
  if (err) {
    console.error("Database error:", err)
  } else {
    console.log("SQLite Connected ✅")
  }
})

// Create cards table
db.run(`
  CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note TEXT
  )
`)

module.exports = db