import express from "express"
import AdminCtrl from "./admin.controller.js"
import LoginCtrl from "./login.controller.js"
import Path from "path"
const __dirname = Path.resolve()

const router = express.Router()

//control REST api by using express router

router
  .route("/admin")
  .put(AdminCtrl.apiUpdateUser)
  .delete(AdminCtrl.apiDeleteUser)
  .get(AdminCtrl.apiViewUser)

router
  .route("/register")
  .post(AdminCtrl.apiCreateUser)
  .get(function(req, res) {
    res.sendFile(Path.join(__dirname, '../frontend/register.html'))
  })

router
  .route("/")
  .get(function(req, res) {
    res.sendFile(Path.join(__dirname, '../frontend/main.html'))
  })
  .post(LoginCtrl.apiLogin)
  
router.get("/manager", function(req, res) {
  res.send("<h1>Manager</h1>")
})

router.get("/staff", function(req, res) {
  res.send("<h1>staff</h1>")
})

router.get("/owner", function(req, res) {
  res.send("<h1>owner</h1>")
})

export default router