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

    static async getUser(id) {
        try {
            return await users.findOne({ id: id })
        } catch (err) {
            console.log(`Unable to getUser: ${err.message}`)
            return { error: err }
        }
    }
}