import { Router } from 'express';
import * as StudentService from "../service/studentService.js";

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




export default router;

