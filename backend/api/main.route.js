import express from "express"
import AdminCtrl from "./admin.controller.js"
import LoginCtrl from "./login.controller.js"
import Path from "path"
const __dirname = Path.resolve()

const router = express.Router()



//control REST api by using express router
//----------------------------------admin----------------------------------
router
  .route("/admin")
  .get(function(req, res) {
    res.sendFile(Path.join(__dirname, '../frontend/admin.html'))
  })

//admin create, view, update, delete function
router
  .route('/admin/api')
  .get(AdminCtrl.apiViewUser)
  .put(AdminCtrl.apiUpdateUser)
  .delete(AdminCtrl.apiDeleteUser)
  .post(AdminCtrl.apiCreateUser)


//----------------------------------user----------------------------------
router
  .route("/")
  //display main page
  .get(function(req, res) {
    res.sendFile(Path.join(__dirname, '../frontend/main.html'))
  })
  //login
  .post(LoginCtrl.apiLogin)

router.get("/logout", LoginCtrl.apiLogout)

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