import { Router } from "express";
import * as CommissionService from "../service/commissionService.js";
import authenticate from "../middleware.js";
import multer from "multer";
import { Document } from "../models/Document.js";

const router = Router();
// const upload = multer({ dest: 'uploads/' });
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
*/

/*
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 } // 10 MB dosya boyutu sınırı
});
*/


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/upload", upload.array('files'), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Dosya yüklenemedi.' });
    }

    try {
        const documents = await Promise.all(
            req.files.map(file => CommissionService.uploadDocument(file.buffer, file.originalname))
        );
        res.status(200).json({ message: 'Dökümanlar başarıyla yüklendi', documents });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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


router.post("/approve-application", authenticate, async (req, res) => {
    const { studentId } = req.body;
  
    try {
      await CommissionService.approveApplication(studentId);
      res.status(200).json({ message: 'Application approved successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Başvuru reddetme route'u
  router.post("/reject-application", authenticate, async (req, res) => {
    const { studentId, feedback } = req.body;
  
    try {
      await CommissionService.rejectApplication(studentId, feedback);
      res.status(200).json({ message: 'Application rejected successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  // Pending documents endpoint'i
  router.get("/documents/pending", authenticate, async (req, res) => {
    try {
        const pendingDocuments = await CommissionService.getPendingDocuments();
        res.status(200).json({ pendingDocuments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });
  
  // Belirli bir öğrenciye ait dökümanları getiren endpoint
  router.get("/documents/:studentId", authenticate, async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const studentDocuments = await CommissionService.getStudentDocuments(studentId);
        res.status(200).json({ studentDocuments });
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

router.get("/viewSpafs", authenticate, async(req, res) => {
    try{
        const companySpafs = await CommissionService.viewSpafs();
        res.status(200).json(companySpafs);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})


router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await CommissionService.deleteDocument(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;