import UsersDAO from "../dao/usersDAO.js"

export default class LoginController {
    static async apiLogin(req, res) {
        try {
            const id = req.body.id
            const password = req.body.password
            
            const checkAccount = await UsersDAO.getUser(id)
    
            if (checkAccount) {
                if (password === checkAccount.password) {
                    User.loggedIn = true
                    User.id = checkAccount.id
                    User.role = checkAccount.role
                    
                    res.redirect(process.env.MAIN_PAGE + `/${checkAccount.role}`)
                }
                else {
                    res.json({ status: 'incorrect password' })
                }
            }
            else {
                res.json({ status: 'no such ID' })
            }
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }

    static async apiLogout(req, res) {
        try {
            User.loggedIn = false
            User.id = null
            User.role = null

            res.redirect(process.env.MAIN_PAGE)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }
}
