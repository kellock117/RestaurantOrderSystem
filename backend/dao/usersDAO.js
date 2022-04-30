import mongodb from "mongodb"
let users

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.DB_NAME).collection('users')
        } catch (err) {
            console.log(`Unable to connect to MongoDB: ${err.message}`)
        }
    }

    static async createUser(id, password, userName, role) {
        try {
            const userDoc = {
                id: id,
                password: password,
                userName: userName,
                role: role
            }
            return await users.insertOne(userDoc)
        } catch (err) {
            console.log(`Unable to insert user: ${err.message}`)
            return { error: err }
        }
    }

    static async getAllUsers() {
        try {
            return await users.find().toArray()
        } catch (err) {
            console.log(`Unable to get user: ${err.message}`)
            return { error: err }
        }
    }

    static async getUserById(id) {
        try {
            return await users.findOne({ id: id })
        } catch (err) {
            console.log(`Unable to get user: ${err.message}`)
            return { error: err }
        }
    }

    static async getUserByFilter(filter, value) {
        try {
            if (filter === "userName"){
                return await users.find({ userName: { $regex: value } }).toArray()
            }
            else if (filter === "role") {
                return await users.find({ role: value }).toArray()
            }
        } catch (err) {
            console.log(`Unable to get user: ${err.message}`)
            return { error: err }
        }
    }

    static async updateUser(id, password = false, userName = false, role = false) {
        try {
            const filter = { id: id }
            let updateDoc

            if (password) {
                updateDoc = { $set: { password: password } }
            }
            else if (userName && role) {
                updateDoc = { 
                    $set: { 
                        userName: userName,
                        role: role 
                    } 
                }
            }

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