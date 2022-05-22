import MenusDAO from "../dao/menusDAO.js"
import ImagesDAO from "../dao/imagesDAO.js"

export default class MenuController{
    static async apiCreateMenu(req, res) {
        try {
            const name = req.body.name

            //check if menu already exists
            const checkDuplication = await MenusDAO.getMenu(name)
            
            if (req.files.length <= 0) {
                return res.json({ status: "You must select a file." })
            }

            //if not
            if (!checkDuplication) {
                const price = req.body.price
                const image = req.files.map(e => e.filename)
                
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
            const image = req.body.image ? req.files.map(e => e.filename) : menu.image
            
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
            let menus = await MenusDAO.getAllMenus()
            
            for (const menu of menus) {
                await ImagesDAO.downloadImages(menu)
            }
    
            //return menus list
            res.json(menus)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    static async apiSearchMenu(req, res) {
        try {
            const name = req.body.name
            const menus = await MenusDAO.getMenus(name)

            for (const menu of menus) {
                await ImagesDAO.downloadImages(menu)
            }

            //return filtered menus list
            res.json(menus)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiDeleteMenu(req, res) {
        try {
            const name = req.body.name
            const menuInfo = await MenusDAO.getMenu(name)
            const fileID = await ImagesDAO.getFileID(menuInfo.image)

            await ImagesDAO.deleteImage(fileID)
            await MenusDAO.deleteMenu(name)

            res.json({ status: 'success'})
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }
}