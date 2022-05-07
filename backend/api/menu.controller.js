import MenusDAO from "../dao/menusDAO.js"

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
            const name = req.body.name
            let rename = req.body.name

            // if rename is passed, check duplication
            if (req.body.rename) {
                rename = req.body.rename
                const checkMenuNameDuplication = await MenusDAO.getMenu(rename)

                //if Menu name does exist
                if (checkMenuNameDuplication) {
                    return res.json({ status: "Menu name already exists" })
                }
            }
            const menu = await MenusDAO.getMenu(name)

            // if price and image are not passed, then get information from original menu
            const price = req.body.price ? req.body.price : menu.price
            const image = req.body.image ? req.body.image : menu.image
            
            await MenusDAO.updateMenu(
                name,
                rename,
                price,
                image
            )
            
            res.json({ status: 'success'})
        } catch (err) {
            res.status(400).json({ error: err })
        }
    } 

    static async apiViewMenu(_req, res) {
        try {
            let Menus = await MenusDAO.getAllMenus()

            //return menus list
            res.json(Menus)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiSearchMenu(req, res) {
        try {
            const name = req.body.name
            let Menus = await MenusDAO.getMenus(name)

            //return filtered menus list
            res.json(Menus)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiDeleteMenu(req, res) {
        try {
            const name = req.body.name

            const checkMenu = await MenusDAO.getMenu(name)

            //check whether the menu exists
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