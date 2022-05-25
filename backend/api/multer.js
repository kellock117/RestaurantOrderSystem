import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

let storage = new GridFsStorage({
    url: process.env.DB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (_req, file) => {
        const match = ["image/png", "image/jpeg"];
        let fileName = `${Date.now()}${file.originalname}`;

        if (match.indexOf(file.mimetype) === -1) {
            return fileName;
        }

        return {
            bucketName: "images",
            filename: fileName,
        };
    },
});

let uploadFiles = multer({ storage: storage });

export default uploadFiles;
