import PromotionsDAO from "../dao/promotionsDAO.js"

export default class PromotionController{
    static async apiCreatePromotion(req, res) {
        try {
            const code = req.body.code

            //check if promotion already exists
            const checkCodeDuplication = await PromotionsDAO.getPromotion(code)

            //if not
            if (!checkCodeDuplication) {
                const discountRate = req.body.discountRate
                let splitDate = req.body.expiryDate.split('-')
                const date = new Date(splitDate)
                //access to database
                await PromotionsDAO.createPromotion(
                    code,
                    discountRate,
                    date
                )

                res.json({ status: "success" })
            }
            //if code already exists
            else {
                res.json({ status: 'Code already exists' })
            }
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiUpdatePromotion(req, res) {
        try {
            const code = req.body.code
            const promotion = await PromotionsDAO.getPromotion(code)

            // if discountRate and expiryDate are not passed, then get information from original promotion
            const discountRate = req.body.discountRate ? req.body.discountRate : promotion.discountRate
            const expiryDate = req.body.expiryDate ? req.body.expiryDate : promotion.expiryDate
            const splitDate = expiryDate.split('-')
            const date = new Date(splitDate)

            
            await PromotionsDAO.updatePromotion(
                code,
                discountRate,
                date
            )
            
            res.json({ status: 'success'})
        } catch (err) {
            res.status(400).json({ error: err })
        }
    } 

    static async apiViewPromotion(_req, res) {
        try {
            let users = await PromotionsDAO.getAllPromotions()

            //return users list
            res.json(users)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    static async apiDeletePromotion(req, res) {
        try {
            const code = req.body.code
            await PromotionsDAO.deletePromotion(code)

            res.json({ status: 'success'})
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }
}