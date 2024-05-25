import { Router } from 'express';
import * as StudentService from "../service/studentService.js";
import multer from "multer";
import authenticate from "../middleware.js";


// const router = Router();


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


/*
router.post("/register", async (req, res) => {
    const { studentMail, studentId } = req.body;
    try{
        const student = await StudentService.studentRegister(studentMail, studentId);
        res.json(student);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
    
})

router.post("/login", async (req, res) => {
    const { mail, password } = req.body;

    try{
        await StudentService.studentLogin(mail, password);
        return res.status(200).json({message: 'You have successfully logged in.'})
    }catch(error){
        return res.status(500).json({message: error.message});
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


router.post("/upload", authenticate, upload.single('file'), async (req, res) => {
    try {
        const fileData = req.file.path;
        const fileName = req.file.originalname;
        const userId = req.user.id;
        const studentId = 1;


        const document = await StudentService.uploadDocument(fileData, fileName, userId,studentId);

        res.status(200).json({ message: 'Document successfully uploaded', document });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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

*/

const router = Router();

router.post("/register", async (req, res) => {
    const { studentMail, studentId } = req.body;
    try{
        const student = await StudentService.studentRegister(studentMail, studentId);
        res.json(student);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
    
})

router.post("/login", async (req, res) => {
    const { mail, password } = req.body;

    try{
        await StudentService.studentLogin(mail, password);
        return res.status(200).json({message: 'You have successfully logged in.'})
    }catch(error){
        return res.status(500).json({message: error.message});
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


router.post("/sendForm", async (req, res) => {
    try {
        const form = await StudentService.createSummerPracticeForm(req.body);
        res.status(201).json(form);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


router.post("/uploadSpaf", authenticate, upload.single('file'), async (req, res) => {
    try {
        const fileData = req.file.path;
        const fileName = req.file.originalname;
        const userId = req.user.id;
        const companyMail = req.body.companyMail

        const spaf = await StudentService.uploadSpaf(fileData, fileName, userId, companyMail);

        res.status(200).json({ message: 'Document successfully uploaded', spaf });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;

