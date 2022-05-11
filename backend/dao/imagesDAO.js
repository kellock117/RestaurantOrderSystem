import { GridFSBucket, ObjectId } from "mongodb"
import fs from "fs"

export default class ImagesDAO {
    constructor() {
        this.files = null
        this.chunks = null
        this.database = null
    }

    static async injectDB(conn) {
        if (this.files) {
            return
        }
        try {
            this.files = await conn.db(process.env.DB_NAME).collection('images.files')
            this.chunks = await conn.db(process.env.DB_NAME).collection('images.chunks')
            this.database = await conn.db(process.env.DB_NAME)
        } catch (err) {
            console.log(`Unable to connect to MongoDB: ${err.message}`)
        }
    }

    static async downloadImages(menu) {
        try {
            let names = Object.values(menu.image)

            let fileInfos = await this.files.find({ filename: { $in: names } }).toArray()

            const bucket = new GridFSBucket(this.database, {
                bucketName: "images"
            })
            
            for (let i=0; i < names.length; i++) {
                bucket.openDownloadStream(fileInfos[i]._id).
                pipe(fs.createWriteStream('./images/' + names[i]))
            }
        } catch (err) {
            console.log(`Unable to get files: ${err.message}`)
        }
    }
}