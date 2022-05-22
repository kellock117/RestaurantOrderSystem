import UsersDAO from "../dao/usersDAO.js"

export default class LoginController {
    static async apiLogin(req, res) {
        try {
            const id = req.body.id
            const password = req.body.password
            
            const checkAccount = await UsersDAO.getUserById(id)
    
            if (checkAccount) {
                if (password === checkAccount.password) {
                    User.loggedIn = true
                    User.id = id
                    User.userName = checkAccount.userName
                    User.role = checkAccount.role
                    
                    res.json({ 
                        status: 'success',
                        role: User.role
                    })
                }
                else {
                    res.json( { status: 'incorrect password'} )
                }
            }
            else {
                res.json({ status: 'no such ID' })
            }
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }

    static apiLogout(res) {
        try {
            User.loggedIn = false
            User.id = null
            User.userName = null
            User.role = null
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }
}
