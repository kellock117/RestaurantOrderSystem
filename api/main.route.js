import express from "express";
import UserCtrl from "./user.controller.js";
import LoginCtrl from "./login.controller.js";
import MenuCtrl from "./menu.controller.js";
import PromotionCtrl from "./promotion.controller.js";
import OrderCtrl from "./order.controller.js";
import StatisticsCtrl from "./statistics.controller.js";
import Multer from "./multer.js";
import Path from "path";

const __dirname = Path.resolve();

const router = express.Router();

//control REST api by using express router
//----------------------------------admin----------------------------------

router.get("/admin", function (_req, res) {
    res.sendFile(Path.join(__dirname, "./frontend/admin.html"));
});

// (id, password, userName, role)
router.post("/admin/create", UserCtrl.apiCreateUser);

// ()
router.get("/admin/view", UserCtrl.apiViewUser);

// (filter: "userName" || "role", value)
router.post("/admin/search", UserCtrl.apiSearchUser);

// (id, password) => update account || (id, userName, role) => update profile
router.put("/admin/update", UserCtrl.apiUpdateUser);

// (id)
router.delete("/admin/delete", UserCtrl.apiDeleteUser);

// ()
router.get("/admin/logout", LoginCtrl.apiLogout);

//----------------------------------main----------------------------------
router
    .route("/")
    //display main page
    .get(function (_req, res) {
        res.sendFile(Path.join(__dirname, "./frontend/main.html"));
    })
    //login
    .post(LoginCtrl.apiLogin);

//----------------------------------manager----------------------------------
router.get("/manager", function (_req, res) {
    res.sendFile(Path.join(__dirname, "./frontend/manager.html"));
});

// (name, price, image: select files)
router.post(
    "/manager/createMenu",
    Multer.array("files", 10),
    MenuCtrl.apiCreateMenu
);

// ()
router.get("/manager/viewMenu", MenuCtrl.apiViewMenu);

// (name)
router.post("/manager/searchMenu", MenuCtrl.apiSearchMenu);

// (name, rename = None, price = None, image = None)
router.put(
    "/manager/updateMenu",
    Multer.array("files", 10),
    MenuCtrl.apiUpdateMenu
);

// (name)
router.delete("/manager/deleteMenu", MenuCtrl.apiDeleteMenu);

// (code, discountRate, expiryDate: "yyyy-mm-dd")
router.post("/manager/createPromotion", PromotionCtrl.apiCreatePromotion);

// ()
router.get("/manager/viewPromotion", PromotionCtrl.apiViewPromotion);

// (code, discountRate = None, expiryDate = None: "yyyy-mm-dd")
router.put("/manager/updatePromotion", PromotionCtrl.apiUpdatePromotion);

// (code)
router.delete("/manager/deletePromotion", PromotionCtrl.apiDeletePromotion);

// ()
router.get("/manager/logout", LoginCtrl.apiLogout);

//----------------------------------staff----------------------------------

router.get("/staff", function (_req, res) {
    res.sendFile(Path.join(__dirname, "./frontend/staff.html"));
});

// ()
router.get("/staff/viewOrder", OrderCtrl.apiViewUnconfirmedOrder);

// ()
router.get("/staff/viewAllOrder", OrderCtrl.apiViewAllOrder);

// (tableNumber)
router.post("/staff/searchOrder", OrderCtrl.apiSearchOrder);

// (_id)
router.put("/staff/confirmOrder", OrderCtrl.apiUpdateOrder);

// (_id)
router.delete("/staff/deleteOrder", OrderCtrl.apiDeleteOrder);

// ()
router.get("/staff/logout", LoginCtrl.apiLogout);

//----------------------------------owner----------------------------------

router.get("/owner", function (_req, res) {
    res.sendFile(Path.join(__dirname, "./frontend/owner.html"));
});

// (filter: "month", year, month) => monthly visiting
// (filter: "week", year, month, from, to) => weekly visiting
// (filter: "day", year, month, day) => daily visiting
router.post("/owner/visiting", StatisticsCtrl.apiGetVisiting);
router.post("/owner/totalAmount", StatisticsCtrl.apiGetTotalAmount);
router.post("/owner/preference", StatisticsCtrl.apiGetPreference);

router.get("/owner/logout", LoginCtrl.apiLogout);

//----------------------------------customer----------------------------------

router.get("/customer", function (_req, res) {
    res.sendFile(Path.join(__dirname, "./frontend/customer.html"));
});

// ()
router.get("/customer/viewMenu", MenuCtrl.apiViewMenu);

// (name)
router.post("/customer/searchMenu", MenuCtrl.apiSearchMenu);

// (tableNumber, menus: array of menu object: { name, quantity: integer })
router.post("/customer/createOrder", OrderCtrl.apiCreateOrder);

// (tableNumber)
router.post("/customer/viewOrder", OrderCtrl.apiSearchOrder);

// (tableNumber, code = None) promotion code
router.put("/customer/payOrder", OrderCtrl.apiPayOrder);

// (tableNumber)
router.delete("/customer/cancelOrder", OrderCtrl.apiDeleteOrder);

// ()
router.get("/customer/logout", LoginCtrl.apiLogout);

export default router;
