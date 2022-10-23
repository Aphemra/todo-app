require("dotenv").config()
const app = require("express")()

const { prisma } = require("@prisma/client")
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/account/create", require("./routes/CreateAccount"))
app.post("/account/login", require("./routes/Login"))

app.get("/tasks", require("./routes/GetTasks"))
app.post("/tasks", require("./routes/CreateTask"))
app.put("/tasks", require("./routes/CheckOffTask"))
app.delete("/tasks", require("./routes/DeleteTask"))

app.use(require("./middleware/CatchValidations"))

module.exports = app

// const PORT = process.env.PORT
// app.listen(PORT)
