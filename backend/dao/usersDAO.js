import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let users

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.USER).collection('users')
        } catch (err) {
            console.log(`Unable to connect to MongoDB: ${err.message}`)
        }
    }

    static async addUser(id, password, role) {
        try {
            const userDoc = {
                id: id,
                password: password,
                role: role
            }
            return await users.insertOne(userDoc)
        } catch (err) {
            console.log(`Unable to insert user: ${err.message}`)
            return { error: err }
        }
    }

    static async getUser(id = false) {
        try {
            if (id) {
                return await users.findOne({ id: id })
            }
            return await users.find().toArray()
        } catch (err) {
            console.log(`Unable to get user: ${err.message}`)
            return { error: err }
        }
    }

    static async updateUser(id, password) {
        try {
            const filter = { id: id }
            const updateDoc = { $set: { password: password }}

            return await users.updateOne(filter, updateDoc)
        } catch (err) {
            console.log(`Unable to update user: ${err.message}`)
            return { error: err }
        }
    }

    static async deleteUser(id) {
        try {
            const query = { id: id }
            return await users.deleteOne(query)
        } catch (err) {
            console.log(`Unable to delete user: ${err.message}`)
            return { error: err }
        }
    }
}