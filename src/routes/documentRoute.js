import { Router } from "express";
import multer from "multer";
import * as CommissionService from "../service/commissionService.js";
import authenticate from "../middleware.js";

const router = Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Dosya yüklenemedi.' });
        }

        const fileData = req.file.buffer;
        const fileName = req.file.originalname;

        // Dosyayı yükle
        const document = await CommissionService.uploadDocument(fileData, fileName);

        res.status(200).json({ message: 'Döküman başarıyla yüklendi', document });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;