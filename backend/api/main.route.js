import express from "express"
import AdminCtrl from "./admin.controller.js"

const router = express.Router()

// router.route("/").get(UsersCtrl.getUsers)
// router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
// router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

router
  .route("/")
  .put(AdminCtrl.apiUpdateUser)
  .delete(AdminCtrl.apiDeleteUser)
  .get(AdminCtrl.apiViewUser)

router
  .route("/register")
  .post(AdminCtrl.apiCreateUser)
  

export default router