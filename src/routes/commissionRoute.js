import { Router } from "express";
import * as CommissionService from "../service/commissionService.js";
import authenticate from "../middleware.js";
import multer from "multer";
import { Document } from "../models/Document.js";

const router = Router();
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 } // 10 MB dosya boyutu sınırı
});

router.post("/register", async(req, res) => {
    const { email, password } = req.body;

    try{
        const commission = await CommissionService.commissionSignUp(email, password);
        res.json(commission)
    }catch(error) {
        return res.status(500).json({message: error.message});
    }
});


router.post("/upload", upload.single('file'), async (req, res) => {
    try {
        // İsteğin içinden dosya bilgilerini al
        const fileData = req.file.path;
        const fileName = req.file.originalname;

        // Dosyayı yükle
        const document = await CommissionService.uploadDocument(fileData, fileName);

        res.status(200).json({ message: 'Döküman başarıyla yüklendi', document });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to download a file
router.get("/download/:filename", async (req, res) => {
    const filename = req.params.filename;
    const filePath = `uploads/${filename}`;

    res.download(filePath, (err) => {
        if (err) {
            res.status(500).json({ message: "Dosya indirilemedi.", error: err.message });
        }
    });
});


/*
router.get("/viewDocuments", async (req, res) => {
    try {
        // Tüm belgeleri bul
        const documents = await Document.findAll();

        // Belgeleri istemciye gönder
        
        res.status(200).json(documents.map(doc => ({
            ...doc,
            downloadLink: `/download/${doc.fileName}`
        })));
        
    } catch (error) {
        // Hata durumunda istemciye hata mesajını gönder
        res.status(500).json({ message: error.message });
    }
});
*/


router.get("/viewDocuments", async (req, res) => {
    try {
        // Tüm belgeleri bul
        const documents = await Document.findAll();

        // Belgeleri istemciye gönder
        res.status(200).json(documents);
    } catch (error) {
        // Hata durumunda istemciye hata mesajını gönder
        res.status(500).json({ message: error.message });
    }
});


export default router;