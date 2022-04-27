import express from "express"
import AdminCtrl from "./admin.controller.js"
import LoginCtrl from "./login.controller.js"
import Path from "path"
const __dirname = Path.resolve()

const router = express.Router()

// router.route("/").get(UsersCtrl.getUsers)
// router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
// router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

router
  .route("/admin")
  .put(AdminCtrl.apiUpdateUser)
  .delete(AdminCtrl.apiDeleteUser)
  .get(AdminCtrl.apiViewUser)

router
  .route("/register")
  .post(AdminCtrl.apiCreateUser)

// router.route("/").get(AdminCtrl.apiGetPage)

router.get("/", function(req, res) {
  res.sendFile(Path.join(__dirname, '../frontend/main.html'))
})

router.get("/register", function(req, res) {
  res.sendFile(Path.join(__dirname, '../frontend/register.html'))
})

export default router