export default class UsersDAO {
    constructor() {
        this.users = null
    }

    static async injectDB(conn) {
        if (this.users) {
            return
        }
        try {
            this.users = await conn.db(process.env.DB_NAME).collection('users')
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
            return await this.users.insertOne(userDoc)
        } catch (err) {
            console.log(`Unable to insert user: ${err.message}`)
            return { error: err }
        }
    }

    static async getAllUsers() {
        try {
            return await this.users.find().toArray()
        } catch (err) {
            console.log(`Unable to get user: ${err.message}`)
            return { error: err }
        }
    }

    static async getUserById(id) {
        try {
            return await this.users.findOne({ id: id })
        } catch (err) {
            console.log(`Unable to get user: ${err.message}`)
            return { error: err }
        }
    }

    static async getUserByFilter(filter, value) {
        try {
            if (filter === "userName"){
                return await this.users.find({ userName: { $regex: value } }).toArray()
            }
            else if (filter === "role") {
                return await this.users.find({ role: value }).toArray()
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
            else if (userName || role) {
                updateDoc = { 
                    $set: { 
                        userName: userName,
                        role: role 
                    } 
                }
            }

            return await this.users.updateOne(filter, updateDoc)
        } catch (err) {
            console.log(`Unable to update user: ${err.message}`)
            return { error: err }
        }
    }

    static async deleteUser(id) {
        try {
            const query = { id: id }
            return await this.users.deleteOne(query)
        } catch (err) {
            console.log(`Unable to delete user: ${err.message}`)
            return { error: err }
        }
    }
}