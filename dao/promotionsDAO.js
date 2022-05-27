export default class PromotionsDAO {
    constructor() {
        this.promotions = null;
    }

    static async injectDB(conn) {
        if (this.promotions) {
            return;
        }
        try {
            this.promotions = await conn
                .db(process.env.DB_NAME)
                .collection("promotions");
        } catch (err) {
            console.log(`Unable to connect to MongoDB: ${err.message}`);
        }
    }

    static async createPromotion(code, discountRate, expiryDate) {
        try {
            const promotionDoc = {
                code: code,
                discountRate: discountRate,
                expiryDate: expiryDate,
            };
            return await this.promotions.insertOne(promotionDoc);
        } catch (err) {
            console.log(`Unable to create promotion: ${err.message}`);
            return { error: err };
        }
    }

    static async getPromotion(code) {
        try {
            return await this.promotions.findOne({ code: code });
        } catch (err) {
            console.log(`Unable to get promotion: ${err.message}`);
            return { error: err };
        }
    }

    static async getAllPromotions() {
        try {
            return await this.promotions.find().toArray();
        } catch (err) {
            console.log(`Unable to get all promotions: ${err.message}`);
            return { error: err };
        }
    }

    static async updatePromotion(code, discountRate, expiryDate) {
        try {
            const filter = { code: code };
            let updateDoc = {
                $set: {
                    discountRate: discountRate,
                    expiryDate: expiryDate,
                },
            };

            return await this.promotions.updateOne(filter, updateDoc);
        } catch (err) {
            console.log(`Unable to update promotion: ${err.message}`);
            return { error: err };
        }
    }

    static async deletePromotion(code) {
        try {
            const query = { code: code };
            return await this.promotions.deleteOne(query);
        } catch (err) {
            console.log(`Unable to delete promotion: ${err.message}`);
            return { error: err };
        }
    }
}
