import express from "express"
import cors from "cors"
import MainRouter from "./api/main.route.js"
import Path from "path"
const __dirname = Path.resolve()

const app = express()

app.use(cors())
app.use(express.json())

// app.get("/", (req, res, next) => {
//     res.sendFile(Path.resolve(__dirname, '../main.html'))
//     next()
// })

// app.use("/", (req, res) => {
//     res.sendFile(Path.resolve(__dirname, '../frontend/main.html'))
// })

// app.use("/register", MainRouter, (req, res) => {
//     res.sendFile(Path.join(__dirname, '../frontend/register.html'))
//   })

app.use("/", MainRouter)



app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app