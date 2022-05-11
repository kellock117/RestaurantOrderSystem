import express from "express"
import UserCtrl from "./user.controller.js"
import LoginCtrl from "./login.controller.js"
import MenuCtrl from "./menu.controller.js"
import PromotionCtrl from "./promotion.controller.js"
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
router
  .route('/admin/create')
  .post(UserCtrl.apiCreateUser)

router
  .route('/admin/view')
  .get(UserCtrl.apiViewUser)

router
  .route('/admin/search')  
  .get(UserCtrl.apiSearchUser)

router
  .route('/admin/update')  
  .put(UserCtrl.apiUpdateUser)

router
  .route('/admin/delete')  
  .delete(UserCtrl.apiDeleteUser)

router
  .route('admin/logout')
  .get(LoginCtrl.apiLogout)

router
  .route('admin/userinfo')
  .get(UserCtrl.apiGetUserInfo)

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

router
  .route("/manager/createMenu")
  .post(Multer.array("files", 10), MenuCtrl.apiCreateMenu)

router
  .route("/manager/viewMenu")
  .get(MenuCtrl.apiViewMenu)

router
  .route("/manager/searchMenu")
  .get(MenuCtrl.apiSearchMenu)

router
  .route("/manager/updateMenu")
  .put(MenuCtrl.apiUpdateMenu)

router
  .route("/manager/deleteMenu")
  .delete(MenuCtrl.apiDeleteMenu)

  router
  .route("/manager/createPromotion")
  .post(PromotionCtrl.apiCreatePromotion)

router
  .route("/manager/viewPromotion")
  .get(PromotionCtrl.apiViewPromotion)

router
  .route("/manager/updatePromotion")
  .put(PromotionCtrl.apiUpdatePromotion)

router
  .route("/manager/deletePromotion")
  .delete(PromotionCtrl.apiDeletePromotion)

router
  .route('manager/logout')
  .get(LoginCtrl.apiLogout)

router
  .route('manager/userinfo')
  .get(UserCtrl.apiGetUserInfo)
//----------------------------------staff----------------------------------

router.get("/staff", function(res) {
  res.send("<h1>staff</h1>")
})

router
  .route('staff/logout')
  .get(LoginCtrl.apiLogout)

router
  .route('staff/userinfo')
  .get(UserCtrl.apiGetUserInfo)
//----------------------------------owner----------------------------------

router.get("/owner", function(res) {
  res.send("<h1>owner</h1>")
})

router
  .route('owner/logout')
  .get(LoginCtrl.apiLogout)

router
  .route('owner/userinfo')
  .get(UserCtrl.apiGetUserInfo)




export default router