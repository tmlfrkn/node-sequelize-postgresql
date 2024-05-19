import { Router } from 'express';
import * as AdminService from "../service/adminService.js";
import { Announce } from "../models/Announce.js";

const router = Router();

router.post("/register", async (req, res) => {
    const { adminMail, adminId } = req.body;
    try{
        const admin = await AdminService.adminRegister(adminMail, adminId);
        res.json(admin);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
    
})

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


router.post("/updateAnnounceStatus", async (req, res) => {
    const { announceId } = req.body;
    try {
        const result = await AdminService.updateAnnounceStatus(announceId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});







export default router;

