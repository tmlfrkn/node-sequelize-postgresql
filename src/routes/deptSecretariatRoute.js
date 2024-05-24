import { Router } from 'express';
import { DepartmentSecreteriat } from '../models/DepartmentSecreteriat.js';
import { User } from '../models/User.js';
import * as deptSecretariatService from "../service/deptSecretariatService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticate from "../middleware.js";
import { SSI } from "../models/SSI.js";
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
        const deptSecretariat = await deptSecretariatService.deptSignUp(email, password);
        res.json(deptSecretariat);
    }catch(error){
        return res.status(500).json({message: error.message})
    }
});

export async function deptLogin(mail, password, res) {
    const dept_secreteriat = await DepartmentSecreteriat.findOne({
        where: {
            deptMail: mail,
        }
    });

    if(dept_secreteriat) {
        const isSame = await bcrypt.compare(password.toString(), dept_secreteriat.password);

        if(isSame) {
            let token = jwt.sign({id: dept_secreteriat.userId}, process.env.SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000
            })


            res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: false });
            console.log("user", JSON.stringify(dept_secreteriat, null, 2));
            console.log(token);
            //send user data

            const user = await User.findOne({
                where: {
                    id: dept_secreteriat.userId
                },
                attributes: ['id', 'permission']
            })

            return user.permission;
        }else {
            throw new Error('Invalid credentials');
        }
    }else {
        throw new Error('User not found');
    }
}

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
export default router;