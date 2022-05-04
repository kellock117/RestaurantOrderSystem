import MenusDAO from "../dao/MenusDAO.js"
import Menu from "../Menu.js"

export default class MenuController{
    static async apiCreateMenu(req, res) {
        try {
            const id = req.body.id

            //check if Menu already exists
            const checkIdDuplication = await MenusDAO.getMenuById(id)

            //if not
            if (!checkIdDuplication) {
                const MenuName = req.body.MenuName
                const checkMenuNameDuplication = await MenusDAO.getMenuByFilter("MenuName", MenuName)
                
                //if Menu name does not exist
                if (!checkMenuNameDuplication.length) {
                    const password = req.body.password
                    const role = req.body.role
    
                    //access to database
                    await MenusDAO.createMenu(
                        id,
                        password,
                        MenuName,
                        role
                    )
                }
                else {
                    return res.json({ status: "Menu name already exists" })
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

    static async apiUpdateMenu(req, res) {
        try {
            const id = req.body.id
            const checkAccount = await MenusDAO.getMenuById(id)

            //check account exist or not
            if (checkAccount) {
                //if password is passed then change password
                if (req.body.password) {
                    await MenusDAO.updateMenu(
                        id,
                        req.body.password
                    )
                }
                //if MenuName or role are passed then change them
                else {
                    const MenuName = req.body.MenuName
                    const checkMenuNameDuplication = await MenusDAO.getMenuByFilter("MenuName", MenuName)

                    //if Menu name does not exist
                    if (!checkMenuNameDuplication.length) {
                        await MenusDAO.updateMenu(
                            id,
                            MenuName,
                            req.body.role
                        )
                    }
                    //if exists then return status json
                    else {
                        return res.json({ status: "Menu name already exists" })
                    }
                }

                res.json({ status: 'success'})
            }
            else {
                res.json({ status: 'Menu does not exist' })
            }
        } catch (err) {
            res.status(400).json({ error: err })
        }
    } 

    static async apiViewMenu(_req, res) {
        try {
            let Menus = await MenusDAO.getAllMenus()

            //return Menus list
            res.json(Menus)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiSearchMenu(req, res) {
        try {
            const filter = req.body.filter
            let Menus = await MenusDAO.getMenuByFilter(filter, req.body.value)

            //return filtered Menus list
            res.json(Menus)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiDeleteMenu(req, res) {
        try {
            const id = req.body.id

            const checkAccount = await MenusDAO.getMenuById(id)

            //check whether the Menu exists
            if (checkAccount) {
                await MenusDAO.deleteMenu(id)

                res.json({ status: 'success'})
            }
            else {
                res.json({ status: 'Menu does not exist' })
            }
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiGetMenuInfo(_req, res) {
        try {
            res.json(Menu)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }
}