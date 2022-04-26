import express from "express"
import cors from "cors"
import users from "./api/main.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use(["/", "/register"], users)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app