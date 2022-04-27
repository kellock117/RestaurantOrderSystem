import UsersDAO from "../dao/usersDAO.js"
import Path from "path"
const __dirname = Path.resolve()

export default class AdminController{
    static async apiCreateUser(req, res, next) {
        try {
            const id = req.body.id
            
            const checkDuplication = await UsersDAO.getUser(id)

            if (!checkDuplication) {
                const password = req.body.password
                const role = req.body.role

                const UserResponse = await UsersDAO.addUser(
                    id,
                    password,
                    role
                )
                
                res.redirect(process.env.MAIN_PAGE)
            }
            else {
                res.json({ status: 'ID already exists' })
            }
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiUpdateUser(req, res, next) {
        try {
            const id = req.body.id
            const password = req.body.password

            const checkAccount = await UsersDAO.getUser(id)

            if (checkAccount) {
                const UserResponse = await UsersDAO.updateUser(
                    id,
                    password
                )

                res.json({ status: 'success'})
            }
            else {
                res.json({ status: 'user does not exist' })
            }
        } catch (err) {
            res.status(400).json({ error: err })
        }
    } 

    static async apiViewUser(req, res, next) {
        try {
            const users = await UsersDAO.getUser()

            res.json(users)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiSearchUser(req, res, next) {
        try {
            const user = await UsersDAO.getUser(req.body.id)

            res.json(user)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiDeleteUser(req, res, next) {
        try {
            const id = req.body.id

            const checkAccount = await UsersDAO.getUser(id)

            if (checkAccount) {
                const UserResponse = await UsersDAO.deleteUser(
                    id
                )

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