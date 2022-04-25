import express from "express"
import UsersCtrl from "./users.controller.js"

const router = express.Router()

// router.route("/").get(UsersCtrl.getUsers)
// router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
// router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

router
  .route("/register")
  .post(UsersCtrl.apiPostUser)
  // .put(ReviewsCtrl.apiUpdateReview)
  // .delete(ReviewsCtrl.apiDeleteReview)

export default router