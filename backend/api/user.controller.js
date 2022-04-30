import UsersDAO from "../dao/usersDAO.js"

export default class UserController{
    static async apiCreateUser(req, res) {
        try {
            const id = req.body.id

            //check if user already exists
            const checkIdDuplication = await UsersDAO.getUserById(id)

            //if not
            if (!checkIdDuplication) {
                const userName = req.body.userName
                const checkUserNameDuplication = await UsersDAO.getUserByFilter("userName", userName)
                
                //if user name does not exist
                if (!checkUserNameDuplication.length) {
                    const password = req.body.password
                    const role = req.body.role
    
                    //access to database
                    const UserResponse = await UsersDAO.createUser(
                        id,
                        password,
                        userName,
                        role
                    )
                }
                else {
                    return res.json({ status: "user name already exists" })
                }
                
                res.json({ status: "success" })
            }
            //if id already exists
            else {
                res.json({ status: 'ID already exists' })
            }
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiUpdateUser(req, res) {
        try {
            const id = req.body.id
            const checkAccount = await UsersDAO.getUserById(id)

            //check account exist or not
            if (checkAccount) {
                //if password is passed then change password
                if (req.body.password) {
                    const UserResponse = await UsersDAO.updateUser(
                        id,
                        req.body.password
                    )
                }
                //if userName or role are passed then change them
                else {
                    const userName = req.body.userName
                    const checkUserNameDuplication = await UsersDAO.getUserByFilter("userName", userName)

                    //if user name does not exist
                    if (!checkUserNameDuplication.length) {
                        const UserResponse = await UsersDAO.updateUser(
                            id,
                            userName,
                            req.body.role
                        )
                    }
                    //if exists then return status json
                    else {
                        return res.json({ status: "user name already exists" })
                    }
                }

                res.json({ status: 'success'})
            }
            else {
                res.json({ status: 'user does not exist' })
            }
        } catch (err) {
            res.status(400).json({ error: err })
        }
    } 

    static async apiViewUser(req, res) {
        try {
            let users = await UsersDAO.getAllUsers()

            //return users list
            res.json(users)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiSearchUser(req, res) {
        try {
            let users

            const filter = req.body.filter

            if (filter === "userName") {
                users = await UsersDAO.getUserByFilter(filter, req.body.value)
            }
            else if (filter === "role") {
                users = await UsersDAO.getUserByFilter(filter, req.body.value)
            }

            //return filtered users list
            res.json(users)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiDeleteUser(req, res) {
        try {
            const id = req.body.id

            const checkAccount = await UsersDAO.getUserById(id)

            //check whether the user exists
            if (checkAccount) {
                const UserResponse = await UsersDAO.deleteUser(id)

                res.json({ status: 'success'})
            }
            else {
                res.json({ status: 'user does not exist' })
            }
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }
}