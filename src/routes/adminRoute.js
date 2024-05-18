import { Router } from 'express';
import * as AdminService from "../service/adminService.js";

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


export default router;

