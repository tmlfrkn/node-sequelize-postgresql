import { Router } from 'express';
import { DepartmentSecreteriat } from '../models/DepartmentSecreteriat.js';
import { User } from '../models/User.js';
import * as deptSecretariatService from "../service/deptSecretariatService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticate from "../middleware.js";
import { SSI } from "../models/SSI.js";
import multer from "multer";
import SummerPractiseForm from '../models/SummerPractiseForm.js';
import { Student } from '../models/Student.js';


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
        const deptSecretariat = await deptSecretariatService.deptSignUp(email, password);
        res.json(deptSecretariat);
    }catch(error){
        return res.status(500).json({message: error.message})
    }
});

router.post("/upload", authenticate, upload.single('file'), async (req, res) => {
    try {
        const fileData = req.file.path;
        const fileName = req.file.originalname;
        const userId = req.user.id;


        const document = await deptSecretariatService.uploadDocument(fileData, fileName, userId);

        res.status(200).json({ message: 'Document successfully uploaded', document });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/download/:filename", async (req, res) => {
    const filename = req.params.filename;
    const filePath = `uploads/${filename}`;

    res.download(filePath, (err) => {
        if (err) {
            res.status(500).json({ message: "Dosya indirilemedi.", error: err.message });
        }
    });
});

router.get("/viewApprovedSpaf", authenticate, async(req, res) => {
    try{
        const spafs = await Student.findOne({
            where: {
                id: 1
            }
        })

        res.status(200).json({ message: 'Document successfully uploaded' }, spafs);
    }catch(error) {
        res.status(500).json({ message: error.message });
    }
})
export default router;