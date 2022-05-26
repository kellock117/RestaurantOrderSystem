import PromotionsDAO from "../dao/promotionsDAO.js";

export default class PromotionController {
    static async apiCreatePromotion(req, res) {
        try {
            const code = req.body.code;

            //check if promotion already exists
            const checkCodeDuplication = await PromotionsDAO.getPromotion(code);

            //if not
            if (!checkCodeDuplication) {
                const discountRate = req.body.discountRate;
                let splitDate = req.body.expiryDate.split("-");
                const date = new Date(splitDate);
                date.setDate(date.getDate() + 1);

                //access to database
                await PromotionsDAO.createPromotion(code, discountRate, date);

                res.json({ status: "success" });
            }
            //if code already exists
            else {
                res.json({ status: "Code already exists" });
            }
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async apiUpdatePromotion(req, res) {
        try {
            console.log(req.body);
            const code = req.body.code;
            const promotion = await PromotionsDAO.getPromotion(code);
            // if discountRate and expiryDate are not passed, then get information from original promotion
            const discountRate =
                req.body.discountRate || promotion.discountRate;
            const expiryDate = req.body.expiryDate || promotion.expiryDate;
            let date;

            if (expiryDate == promotion.expiryDate) {
                date = new Date(promotion.expiryDate);
            } else {
                const splitDate = expiryDate.split("-");
                date = new Date(splitDate);
            }

            await PromotionsDAO.updatePromotion(code, discountRate, date);

            res.json({ status: "success" });
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async apiViewPromotion(_req, res) {
        try {
            let users = await PromotionsDAO.getAllPromotions();

            //return users list
            res.json(users);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async apiSearchromotion(req, res) {
        try {
            const code = req.body.code;
            let users = await PromotionsDAO.getPromotion(code);

            //return users list
            res.json(users);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async apiDeletePromotion(req, res) {
        try {
            const code = req.body.code;

            const checkCode = await PromotionsDAO.getPromotion(code);

            if (checkCode) {
                await PromotionsDAO.deletePromotion(code);
            } else {
                return res.json({ status: "code does not exist" });
            }

            res.json({ status: "success" });
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }
}
