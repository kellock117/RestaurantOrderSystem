import express from "express"
import cors from "cors"
import MainRouter from "./api/main.route.js"
import Path from "path"
import BodyParser from "body-parser"
const __dirname = Path.resolve()

const app = express()

app.use(BodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(express.json())

app.use("/", MainRouter)

app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app