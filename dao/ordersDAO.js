import { ObjectId } from "mongodb";

export default class OrdersDAO {
    constructor() {
        this.orders = null;
    }

    static async injectDB(conn) {
        if (this.orders) {
            return;
        }
        try {
            this.orders = await conn
                .db(process.env.DB_NAME)
                .collection("orders");
        } catch (err) {
            console.log(`Unable to connect to MongoDB: ${err.message}`);
        }
    }

    static async createOrder(
        tableNumber,
        menus,
        totalAmount,
        date,
        confirmed,
        paid
    ) {
        try {
            const orderDoc = {
                tableNumber: tableNumber,
                menus: menus,
                totalAmount: totalAmount,
                date: date,
                confirmed: confirmed,
                paid: paid,
            };

            return await this.orders.insertOne(orderDoc);
        } catch (err) {
            console.log(`Unable to create order: ${err.message}`);
            return { error: err };
        }
    }

    static async searchOrder(tableNumber) {
        try {
            return await this.orders
                .find({
                    tableNumber: tableNumber,
                    paid: false,
                })
                .toArray();
        } catch (err) {
            console.log(`Unable to get order: ${err.message}`);
            return { error: err };
        }
    }

    static async getOrders(tableNumber) {
        try {
            const filter = {
                tableNumber: tableNumber,
                confirmed: true,
                paid: false,
            };

            return await this.orders.find(filter).toArray();
        } catch (err) {
            console.log(`Unable to get all orders: ${err.message}`);
            return { error: err };
        }
    }

    static async getUnconfirmedOrders() {
        try {
            return await this.orders.find({ confirmed: false }).toArray();
        } catch (err) {
            console.log(`Unable to get unconfirmed orders: ${err.message}`);
            return { error: err };
        }
    }

    static async getAllOrders(query) {
        try {
            return await this.orders.find(query).toArray();
        } catch (err) {
            console.log(`Unable to get all orders: ${err.message}`);
            return { error: err };
        }
    }

    static async confirmOrder(id) {
        try {
            const filter = { _id: ObjectId(id) };
            let updateDoc = { $set: { confirmed: true } };

            return await this.orders.updateOne(filter, updateDoc);
        } catch (err) {
            console.log(`Unable to update menu: ${err.message}`);
            return { error: err.message };
        }
    }

    static async deleteOrder(id) {
        try {
            const query = {
                _id: ObjectId(id),
                confirmed: false,
            };

            return await this.orders.deleteOne(query);
        } catch (err) {
            console.log(`Unable to delete order: ${err.message}`);
            return { error: err };
        }
    }

    static async deleteOrders(tableNumber) {
        try {
            const query = {
                tableNumber: tableNumber,
                confirmed: true,
                paid: false,
            };

            return await this.orders.deleteMany(query);
        } catch (err) {
            console.log(`Unable to delete order: ${err.message}`);
            return { error: err };
        }
    }
}
