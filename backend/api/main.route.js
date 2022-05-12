import express from "express"
import UserCtrl from "./user.controller.js"
import LoginCtrl from "./login.controller.js"
import MenuCtrl from "./menu.controller.js"
import PromotionCtrl from "./promotion.controller.js"
import OrderCtrl from "./order.controller.js"
import Multer from "./multer.js"
import Path from "path"

const __dirname = Path.resolve()

const router = express.Router()



//control REST api by using express router
//----------------------------------admin----------------------------------
router
  .route("/admin")
  .get(function(_req, res) {
    res.sendFile(Path.join(__dirname, '../frontend/admin.html'))
  })

//admin create, view, update, delete function
router.post('/admin/create', UserCtrl.apiCreateUser)

router.get('/admin/view', UserCtrl.apiViewUser)

router.get('/admin/search', UserCtrl.apiSearchUser)

router.put('/admin/update', UserCtrl.apiUpdateUser)

router.delete('/admin/delete', UserCtrl.apiDeleteUser)

router.get('/admin/logout', LoginCtrl.apiLogout)

router.get('/admin/userinfo', UserCtrl.apiGetUserInfo)

//----------------------------------main----------------------------------
router
  .route("/")
  //display main page
  .get(function(_req, res) {
    res.sendFile(Path.join(__dirname, '../frontend/main.html'))
  })
  //login
  .post(LoginCtrl.apiLogin)


//----------------------------------manager----------------------------------
router.get("/manager", function(_req, res) {
  res.sendFile(Path.join(__dirname, '../frontend/manager.html'))
})

router.post("/manager/createMenu", Multer.array("files", 10), MenuCtrl.apiCreateMenu)

router.get("/manager/viewMenu", MenuCtrl.apiViewMenu)

router.get("/manager/searchMenu", MenuCtrl.apiSearchMenu)

router.put("/manager/updateMenu", MenuCtrl.apiUpdateMenu)

router.delete("/manager/deleteMenu", MenuCtrl.apiDeleteMenu)

router.post("/manager/createPromotion", PromotionCtrl.apiCreatePromotion)

router.get("/manager/viewPromotion", PromotionCtrl.apiViewPromotion)

router.put("/manager/updatePromotion", PromotionCtrl.apiUpdatePromotion)

router.delete("/manager/deletePromotion", PromotionCtrl.apiDeletePromotion)

router.get('/manager/logout', LoginCtrl.apiLogout)

router.get('/manager/userinfo', UserCtrl.apiGetUserInfo)

//----------------------------------staff----------------------------------

router.get("/staff", function(_req, res) {
  res.send("<h1>staff</h1>")
})

router
  .route('/staff/logout')
  .get(LoginCtrl.apiLogout)

router
  .route('/staff/userinfo')
  .get(UserCtrl.apiGetUserInfo)

//----------------------------------owner----------------------------------

router.get("/owner", function(_req, res) {
  res.send("<h1>owner</h1>")
})

router
  .route('/owner/logout')
  .get(LoginCtrl.apiLogout)

router
  .route('/owner/userinfo')
  .get(UserCtrl.apiGetUserInfo)


//----------------------------------customer----------------------------------

router.get("/customer", function(_req, res) {
  res.sendFile(Path.join(__dirname, '../frontend/customer.html'))
})

router.get('/customer/viewMenu', MenuCtrl.apiViewMenu)

router.get('/customer/searchMenu', MenuCtrl.apiSearchMenu)

router.post('/customer/createOrder', OrderCtrl.apiCreateOrder)

router.get('/customer/viewOrder', OrderCtrl.apiViewOrder)

router.put('/customer/payOrder', OrderCtrl.apiPayOrder)

export default router