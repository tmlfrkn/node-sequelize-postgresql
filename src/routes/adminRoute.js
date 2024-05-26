import { Router } from 'express';
import * as AdminService from "../service/adminService.js";
import { Announce } from "../models/Announce.js";

const router = Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try{
        const admin = await AdminService.adminRegister(email, password);
        res.json(admin);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
    
})

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


router.get("/viewDocuments", async (req, res) => {
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

router.get("/download/:filename", async (req, res) => {
    const filename = req.params.filename;
    const filePath = `uploads/${filename}`;

    res.download(filePath, (err) => {
        if (err) {
            res.status(500).json({ message: "Dosya indirilemedi.", error: err.message });
        }
    });
});

router.put("/updateAnnounceStatus", async (req, res) => {
    const { id } = req.body;
    try {
        const result = await AdminService.updateAnnounceStatus(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await AdminService.deleteAnnounce(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





export default router;

