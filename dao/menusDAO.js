export default class MenusDAO {
    constructor() {
        this.menus = null;
    }

    static async injectDB(conn) {
        if (this.menus) {
            return;
        }
        try {
            this.menus = await conn.db(process.env.DB_NAME).collection("menus");
        } catch (err) {
            console.log(`Unable to connect to MongoDB: ${err.message}`);
        }
    }

    static async createMenu(name, price, image) {
        try {
            const menuDoc = {
                name: name,
                price: price,
                image: image,
            };
            return await this.menus.insertOne(menuDoc);
        } catch (err) {
            console.log(`Unable to create menu: ${err.message}`);
            return { error: err.message };
        }
    }

    static async getMenu(name) {
        try {
            return await this.menus.findOne({ name: name });
        } catch (err) {
            console.log(`Unable to get menu: ${err.message}`);
            return { error: err.message };
        }
    }

    static async getAllMenus() {
        try {
            return await this.menus.find().toArray();
        } catch (err) {
            console.log(`Unable to get all menu: ${err.message}`);
            return { error: err.message };
        }
    }

    static async getMenus(name) {
        try {
            return await this.menus.find({ name: { $regex: name } }).toArray();
        } catch (err) {
            console.log(`Unable to get menus: ${err.message}`);
            return { error: err.message };
        }
    }

    static async updateMenu(name, rename, price, image) {
        try {
            const filter = { name: name };
            let updateDoc = {
                $set: {
                    name: rename,
                    price: price,
                    image: image,
                },
            };

            return await this.menus.updateOne(filter, updateDoc);
        } catch (err) {
            console.log(`Unable to update menu: ${err.message}`);
            return { error: err.message };
        }
    }

    static async deleteMenu(name) {
        try {
            const query = { name: name };
            return await this.menus.deleteOne(query);
        } catch (err) {
            console.log(`Unable to delete menu: ${err.message}`);
            return { error: err.message };
        }
    }
}
