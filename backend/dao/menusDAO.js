import mongodb from "mongodb"
let menus

export default class MenusDAO {
    static async injectDB(conn) {
        if (menus) {
            return
        }
        try {
            menus = await conn.db(process.env.DB_NAME).collection('menus')
        } catch (err) {
            console.log(`Unable to connect to MongoDB: ${err.message}`)
        }
    }

    static async createMenu(name, price, image) {
        try {
            const menuDoc = {
                name: name,
                price: price,
                image: image
            }
            return await menus.insertOne(menuDoc)
        } catch (err) {
            console.log(`Unable to insert user: ${err.message}`)
            return { error: err }
        }
    }

    static async getMenu(name = false) {
        try {
            if (name) {
                return await menus.findOne({ name: name })
            }
            return await menus.find().toArray()
        } catch (err) {
            console.log(`Unable to get user: ${err.message}`)
            return { error: err }
        }
    }

    static async updateMenu(name, price, image) {
        try {
            const filter = { name: name }
            let updateDoc

            if (price) {
                updateDoc = { $set: { price: price }}
            }
            else if (image) {
                updateDoc = { $set: { image: image }}
            }

            return await menus.updateOne(filter, updateDoc)
        } catch (err) {
            console.log(`Unable to update user: ${err.message}`)
            return { error: err }
        }
    }

    static async deleteMenu(name) {
        try {
            const query = { name: name }
            return await menus.deleteOne(query)
        } catch (err) {
            console.log(`Unable to delete user: ${err.message}`)
            return { error: err }
        }
    }
}