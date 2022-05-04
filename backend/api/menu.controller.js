import MenusDAO from "../dao/MenusDAO.js"

export default class MenuController{
    static async apiCreateMenu(req, res) {
        try {
            const name = req.body.name

            //check if menu already exists
            const checkDuplication = await MenusDAO.getMenu(name)

            //if not
            if (!checkDuplication) {
                const price = req.body.price
                const image = req.body.image

                //access to database
                await MenusDAO.createMenu(
                    name,
                    price,
                    image
                )
                
                res.json({ status: "success" })
            }
            //if menu already exists
            else {
                res.json({ status: 'Menu already exists' })
            }
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiUpdateMenu(req, res) {
        try {
            const rename = req.body.rename
            const checkMenuNameDuplication = await MenusDAO.getMenu(rename)

            //if Menu name does not exist
            if (!checkMenuNameDuplication.length) {
                await MenusDAO.updateMenu(
                    req.body.name,
                    rename,
                    req.body.price,
                    req.body.image
                )
            }
            //if exists then return status json
            else {
                return res.json({ status: "Menu name already exists" })
            }

            res.json({ status: 'success'})
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
            const name = req.body.name
            let Menus = await MenusDAO.getMenus(name)

            //return filtered Menus list
            res.json(Menus)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiDeleteMenu(req, res) {
        try {
            const name = req.body.name

            const checkMenu = await MenusDAO.getMenu(name)

            //check whether the Menu exists
            if (checkMenu) {
                await MenusDAO.deleteMenu(name)

                res.json({ status: 'success'})
            }
            else {
                res.json({ status: 'Menu does not exist' })
            }
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }
}