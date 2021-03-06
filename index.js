import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

import UsersDAO from "./dao/usersDAO.js";
import MenusDAO from "./dao/menusDAO.js";
import PromotionsDAO from "./dao/promotionsDAO.js";
import ImagesDAO from "./dao/imagesDAO.js";
import OrdersDAO from "./dao/ordersDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const PORT = process.env.PORT || 8000;

MongoClient.connect(process.env.DB_URI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await UsersDAO.injectDB(client);
        await PromotionsDAO.injectDB(client);
        await MenusDAO.injectDB(client);
        await ImagesDAO.injectDB(client);
        await OrdersDAO.injectDB(client);

        app.listen(PORT, () => {
            console.log(`listening on PORT ${PORT}`);
        });
    });
