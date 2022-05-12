import OrdersDAO from "../dao/ordersDAO.js"
import MenusDAO from "../dao/menusDAO.js"

export default class OrderController{
    // controller should return like
    // {
    //     "tableNumber": "1",
    //     "menus": {
    //         "pizza": 1,
    //         "pasta": 2
    //     }
    // }
    static async apiCreateOrder(req, res) {
        try {
            const tableNumber = req.body.tableNumber
            const menus = req.body.menus
            let menusArray = []
            let totalAmount = 0

            for (const menu in menus) {
                const menuInfo = await MenusDAO.getMenu(menu)
                const quantity = menus[menu]
                const price = menuInfo.price
                const amount = price * quantity

                const menuObj = {
                    name: menu,
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
                false
            )

            res.json({ status: "success" })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    static async apiViewOrder(_req, res) {
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
            const order = await OrdersDAO.getOrders(tableNumber)

            res.json(order)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    static async apiPayOrder(req, res) {
        try {
            const tableNumber = req.body.tableNumber
            const order = await OrdersDAO.getOrders(tableNumber)

            if (!order) {
                return res.json({ status: "nothing to pay" })
            }

            await OrdersDAO.updateOrder(tableNumber)

            res.json({ status: 'success'})
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }
}