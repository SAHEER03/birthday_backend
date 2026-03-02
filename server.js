require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// Connect database
require("./database")

app.use("/api/admin", require("./routes/admin"))
app.use("/api/public", require("./routes/public"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`)
})