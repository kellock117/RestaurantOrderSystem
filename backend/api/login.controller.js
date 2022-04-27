import UsersDAO from "../dao/usersDAO.js"

export default class LoginController {
    static async apiLogin(req, res, next) {
        try {
            const id = req.body.id
            const password = req.body.password
            
            const checkAccount = await UsersDAO.getUser(id)
    
            if (checkAccount) {
                if (password === checkAccount.password) {
                    res.json({ status: 'success', 
                    id: checkAccount.id, 
                    role: checkAccount.role})
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
        
    }
}
