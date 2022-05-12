export default class OrdersDAO {
    constructor() {
        this.orders = null
    }

    static async injectDB(conn) {
        if (this.orders) {
            return
        }
        try {
            this.orders = await conn.db(process.env.DB_NAME).collection('orders')
        } catch (err) {
            console.log(`Unable to connect to MongoDB: ${err.message}`)
        }
    }

    static async createOrder(tableNumber, menus, totalAmount, paid) {
        try {
            const orderDoc = {
                tableNumber: tableNumber,
                menus: menus,
                totalAmount: totalAmount,
                paid: paid
            }

            return await this.orders.insertOne(orderDoc)
        } catch (err) {
            console.log(`Unable to create order: ${err.message}`)
            return { error: err }
        }
    }

    static async getOrders(tableNumber) {
        try {
            return await this.orders.find({ 
                tableNumber: tableNumber,
                paid: false
             })
        } catch (err) {
            console.log(`Unable to get order: ${err.message}`)
            return { error: err }
        }
    }

    static async getAllOrders() {
        try {
            return await this.orders.find({ paid: false }).toArray()
        } catch (err) {
            console.log(`Unable to get all orders: ${err.message}`)
            return { error: err }
        }
    }

    static async updateOrder(tableNumber) {
        try {
            const filter = { tableNumber: tableNumber }
            const updateDoc = {
                $set: { paid: true }
            }

            return await this.orders.updateMany(filter, updateDoc)
        } catch (err) {

        }
    }
}