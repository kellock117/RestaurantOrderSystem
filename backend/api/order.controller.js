import OrdersDAO from "../dao/ordersDAO.js"
import MenusDAO from "../dao/menusDAO.js"
import PromotionsDAO from "../dao/promotionsDAO.js"

export default class OrderController{
    static async apiCreateOrder(req, res) {
        try {
            const tableNumber = req.body.tableNumber
            let menus = req.body.menus 
            const date = new Date()
            let menusArray = []
            let totalAmount = 0


            for (const menu of menus) {
                const name = menu.name
                const menuInfo = await MenusDAO.getMenu(name)
                const quantity = menu.quantity
                const price = menuInfo.price
                const amount = price * quantity

                const menuObj = {
                    name: name,
                    quantity: quantity,
                    price: price,
                    amount: amount
                }

                totalAmount += amount
                menusArray.push(menuObj)
            }

            //access to database
            await OrdersDAO.createOrder(
                tableNumber,
                menusArray,
                totalAmount,
                date,
                false,
                false
            )

            res.json({ status: "success" })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    static async apiViewUnconfirmedOrder(_req, res) {
        try {
            let orders = await OrdersDAO.getUnconfirmedOrders()

            //return users list
            res.json(orders)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    static async apiViewAllOrder(_req, res) {
        try {
            let orders = await OrdersDAO.getAllOrders()

            //return users list
            res.json(orders)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    static async apiSearchOrder(req, res) {
        try {
            const tableNumber = req.body.tableNumber
            const order = await OrdersDAO.searchOrder(tableNumber)

            res.json(order)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    static async apiUpdateOrder(req, res) {
        try {
            const id = req.body._id
            
            await OrdersDAO.confirmOrder(id)

            res.json({ status: "success" })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    static async apiDeleteOrder(req, res) {
        try {
            const tableNumber = req.body.tableNumber

            await OrdersDAO.deleteOrder(tableNumber)

            res.json({ status: "success" })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    static async apiPayOrder(req, res) {
        try {
            const tableNumber = req.body.tableNumber
            const orders = await OrdersDAO.getOrders(tableNumber)

            // if table did not order or already paid
            if (!orders.length) {
                return res.json({ status: "nothing to pay" })
            }

            const promotion = await PromotionsDAO.getPromotion(req.body.code) || false
            let discountedAmount = orders[0].totalAmount
            let menus = []
            let date = orders[0].date

            // if there are more than one order
            if (orders.length >= 2) {
                menus = orders.map(e => e.menus).flat()
                discountedAmount = orders.reduce( (p, c) => p += c.totalAmount, 0)

                menus = menus.reduce( (curr, ele) => {
                    let exist = curr.filter( cur => cur.name == ele.name)
                    if (exist.length) {
                        exist[0].quantity += ele.quantity
                        exist[0].amount += ele.amount
                    }
                    else {
                        curr.push(ele)
                    }

                    return curr
                }, []
                )

            }

            // if promotion code is entered
            if (promotion) {
                // if not expired
                if (promotion.expiryDate > new Date()) {
                    discountedAmount = discountedAmount * (100 - promotion.discountRate) / 100
                }
                else {
                    return res.json({ status: "Promotion code expired" })
                }
            }            

            await OrdersDAO.deleteOrders(tableNumber)

            await OrdersDAO.createOrder(
                tableNumber, 
                menus,
                discountedAmount,
                date,
                true,
                true
            )

            res.json({ 
                status: 'success',
                discountRate: promotion.discountRate,
                amount: discountedAmount
            })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }
}