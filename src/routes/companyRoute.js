import { Router } from 'express';
import * as CompanyService from '../service/companyService.js'
import multer from "multer";
import authenticate from "../middleware.js";

const router = Router();
// const upload = multer({ dest: 'uploads/' });

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
        const company = await CompanyService.companySignUp(email, password);
        res.json(company);
    }catch(error){
        return res.status(500).json({message: error.message})
    }
});

router.post("/upload", authenticate, upload.single('file'), async (req, res) => {
    try {
        const fileData = req.file.path;
        const fileName = req.file.originalname;
        const userId = req.user.id;


        const document = await CompanyService.uploadDocument(fileData, fileName, userId);

        res.status(200).json({ message: 'Document successfully uploaded', document });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



/*
router.post("/upload", upload.single('file'), async (req, res) => {
    try {
        
        const fileData = req.file.path;
        const fileName = req.file.originalname;

    
        const document = await CompanyService.uploadDocument(fileData, fileName);

        res.status(200).json({ message: 'Döküman başarıyla yüklendi', document });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
*/

export default router;