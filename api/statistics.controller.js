import OrdersDAO from "../dao/ordersDAO.js";

export default class StatisticsController {
    static async setQuery(body, filter) {
        const year = Number(body.year);
        const month = Number(body.month);

        let query = {
            $expr: {
                $and: [
                    { $eq: [{ $year: "$date" }, year] },
                    { $eq: [{ $month: "$date" }, month] },
                ],
            },
            paid: true,
        };

        if (filter == "week") {
            const from = Number(body.from);
            const to = Number(body.to);

            query["$expr"]["$and"].push(
                { $gte: [{ $dayOfMonth: "$date" }, from] },
                { $lte: [{ $dayOfMonth: "$date" }, to] }
            );
        } else if (filter == "day") {
            const day = Number(body.day);

            query["$expr"]["$and"].push({
                $eq: [{ $dayOfMonth: "$date" }, day],
            });
        }

        return query;
    }

    static apiGetVisiting = async (req, res) => {
        try {
            const filter = req.body.filter;
            const query = await this.setQuery(req.body, filter);

            const orders = await OrdersDAO.getAllOrders(query);
            const result = orders.length;

            //return result
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    static apiGetTotalAmount = async (req, res) => {
        try {
            const filter = req.body.filter;
            const query = await this.setQuery(req.body, filter);

            const orders = await OrdersDAO.getAllOrders(query);
            let result = 0;

            if (orders.length == 1) {
                result = orders[0].totalAmount;
            } else if (orders.length > 1) {
                result = orders.reduce(
                    (prev, curr) => ((prev += curr.totalAmount), 0)
                );
            }

            //return result
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    static apiGetPreference = async (req, res) => {
        try {
            const filter = req.body.filter;
            const query = await this.setQuery(req.body, filter);

            let orders = await OrdersDAO.getAllOrders(query);
            let result = orders
                .map(e => e.menus)
                .flat()
                .map(({ price, amount, ...rest }) => rest)
                .reduce((curr, ele) => {
                    let exist = curr.filter(cur => cur.name == ele.name);
                    if (exist.length) {
                        exist[0].quantity += ele.quantity;
                    } else {
                        curr.push(ele);
                    }

                    return curr;
                }, []);

            console.log(result);
            //return result
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
}
