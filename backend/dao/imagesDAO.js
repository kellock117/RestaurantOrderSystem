import { GridFSBucket, ObjectId } from "mongodb";
import fs from "fs";

export default class ImagesDAO {
    constructor() {
        this.files = null;
        this.chunks = null;
        this.database = null;
    }

    static async injectDB(conn) {
        if (this.files) {
            return;
        }
        try {
            this.files = await conn
                .db(process.env.DB_NAME)
                .collection("images.files");
            this.chunks = await conn
                .db(process.env.DB_NAME)
                .collection("images.chunks");
            this.database = await conn.db(process.env.DB_NAME);
        } catch (err) {
            console.log(`Unable to connect to MongoDB: ${err.message}`);
        }
    }

    static async downloadImages(menu, res) {
        try {
            let names = Object.values(menu.image);
            let fileInfos = await this.files
                .find({ filename: { $in: names } })
                .toArray();
            let url = [];

            const bucket = new GridFSBucket(this.database, {
                bucketName: "images",
            });

            for (let i = 0; i < names.length; i++) {
                url.push(bucket.openDownloadStream(fileInfos[i]._id).pipe(res));
                // pipe(fs.createWriteStream('./images/' + names[i]))
            }
            console.log(url);
            return url;
        } catch (err) {
            console.log(`Unable to download files: ${err.message}`);
        }
    }

    static async getFileID(fileName) {
        try {
            const option = {
                projection: {
                    _id: 1,
                    length: 0,
                    chunkSize: 0,
                    uploadDate: 0,
                    filename: 0,
                    contentType: 0,
                },
            };

            return await this.files
                .find({ filename: { $in: fileName } }, option)
                .toArray();
        } catch (err) {
            console.log(`Unable to get file information: ${err.message}`);
        }
    }

    static async deleteImage(fileID) {
        try {
            for (const id of fileID) {
                await this.chunks.deleteOne({ files_id: id._id });
                await this.files.deleteOne({ _id: id._id });
            }
        } catch (err) {
            console.log(`Unable to delete files: ${err.message}`);
        }
    }
}
