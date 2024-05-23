import { Router } from 'express';
import * as deansOfficeService from "../service/deansOfficeService.js";
import { DeansOffice } from '../models/DeansOffice.js';
import authenticate from "../middleware.js";
import multer from "multer";

const router = Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 } // 10 MB dosya boyutu sınırı
});

router.post("/register", async(req, res) => {
    const { email, password } = req.body;

    try{
        const deans_office = await deansOfficeService.deansSignUp(email, password);
        res.json(deansOfficeService);
    }catch(error){
        return res.status(500).json({message: error.message})
    }
});

router.get("/viewApprovedDocuments", async (req, res) => {
    try {
        // Yalnızca status field'ı true olan belgeleri bul
        const announces = await Announce.findAll({
            where: {
                status: true
            }
        });

        // Belgeleri istemciye gönder
        res.status(200).json(announces);
    } catch (error) {
        // Hata durumunda istemciye hata mesajını gönder
        res.status(500).json({ message: error.message });
    }
});


router.get("/viewAnnouncements", async (req, res) => {
    try {
        // Tüm belgeleri bul
        const announces = await Announce.findAll();

        // Belgeleri istemciye gönder
        res.status(200).json(announces);
    } catch (error) {
        // Hata durumunda istemciye hata mesajını gönder
        res.status(500).json({ message: error.message });
    }
});


router.get("/viewApprovedDocuments", async (req, res) => {
    try {
        // Tüm belgeleri bul
        const announces = await Announce.findAll();

        // Belgeleri istemciye gönder
        res.status(200).json(announces);
    } catch (error) {
        // Hata durumunda istemciye hata mesajını gönder
        res.status(500).json({ message: error.message });
    }
});


router.post("/upload", authenticate, upload.single('file'), async (req, res) => {
    try {
        const fileData = req.file.path;
        const fileName = req.file.originalname;
        const studentId = 1;//bu değiştirilecek
        const userId = req.user.id;


        const document = await deansOfficeService.uploadDocument(fileData, fileName, userId,studentId);

        res.status(200).json({ message: 'Document successfully uploaded', document });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default router;