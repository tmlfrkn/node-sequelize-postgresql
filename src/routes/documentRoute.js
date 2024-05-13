import { Router } from "express";
import * as CommissionService from "../service/commissionService.js";
import authenticate from "../middleware.js";

const router = Router();

router.post("/upload", async (req, res) => {
    try {
        // İsteğin içinden dosya bilgilerini al
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