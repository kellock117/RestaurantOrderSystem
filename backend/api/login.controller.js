import UsersDAO from "../dao/usersDAO.js"

export default class LoginController {
    static async apiLogin(req, res, next) {
        try {
            const id = req.body.id
            const password = req.body.password
            
            const checkAccount = await UsersDAO.getUser(id)
    
            if (checkAccount) {
                if (password === checkAccount.password) {
                    //TODO: this should be at frontend
                    // localStorage.setItem("login", true)

                    res.json({ status: 'success', 
                    id: checkAccount.id, 
                    role: checkAccount.role})
                    
                    //TODO: this should be at frontend. redirect each url based on role
                    //for example manager go to http://localhost:5000/manger
                    // res.redirect(process.env.MAIN_PAGE + `/${checkAccount.role}`)
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
