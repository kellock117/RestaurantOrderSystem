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
router.get("/admin", function(_req, res) {
    res.sendFile(Path.join(__dirname, '../frontend/admin.html'))
  })

// (id, password, userName, role)
router.post('/admin/create', UserCtrl.apiCreateUser)

// ()
router.get('/admin/view', UserCtrl.apiViewUser)

// (filter: "userName" || "role", value)
router.get('/admin/search', UserCtrl.apiSearchUser)

// (id, password) => update account || (id, userName, role) => update profile
router.put('/admin/update', UserCtrl.apiUpdateUser)

// (id)
router.delete('/admin/delete', UserCtrl.apiDeleteUser)

// ()
router.get('/admin/logout', LoginCtrl.apiLogout)

// ()
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

// (name, price, image: select files)
router.post("/manager/createMenu", Multer.array("files", 10), MenuCtrl.apiCreateMenu)

// ()
router.get("/manager/viewMenu", MenuCtrl.apiViewMenu)

// (name)
router.get("/manager/searchMenu", MenuCtrl.apiSearchMenu)

// (name, rename = None, price = None, image = None)
router.put("/manager/updateMenu", MenuCtrl.apiUpdateMenu)

// (name)
router.delete("/manager/deleteMenu", MenuCtrl.apiDeleteMenu)

// (code, discountRate, expiryDate: "yyyy-mm-dd")
router.post("/manager/createPromotion", PromotionCtrl.apiCreatePromotion)

// ()
router.get("/manager/viewPromotion", PromotionCtrl.apiViewPromotion)

// (code, discountRate = None, expiryDate = None: "yyyy-mm-dd")
router.put("/manager/updatePromotion", PromotionCtrl.apiUpdatePromotion)

// (code)
router.delete("/manager/deletePromotion", PromotionCtrl.apiDeletePromotion)

// ()
router.get('/manager/logout', LoginCtrl.apiLogout)

// ()
router.get('/manager/userinfo', UserCtrl.apiGetUserInfo)

//----------------------------------staff----------------------------------

router.get("/staff", function(_req, res) {
  res.send("<h1>staff</h1>")
})

// (tableNumber)
router.get("/staff/searchOrder", OrderCtrl.apiSearchOrder)

// (tableNumber)
router.delete("/staff/cancelOrder", OrderCtrl.apiDeleteOrder)

// ()
router.get('/staff/logout', LoginCtrl.apiLogout)

// ()
router.get('/staff/userinfo', UserCtrl.apiGetUserInfo)

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

// ()
router.get('/customer/viewMenu', MenuCtrl.apiViewMenu)

// (name)
router.get('/customer/searchMenu', MenuCtrl.apiSearchMenu)

// (tableNumber, menus: array of menu object: { name, quantity: integer })
router.post('/customer/createOrder', OrderCtrl.apiCreateOrder)

// (tableNumber)
router.get('/customer/viewOrder', OrderCtrl.apiViewOrder)

// (tableNumber, code = None) promotion code
router.put('/customer/payOrder', OrderCtrl.apiPayOrder)

export default router