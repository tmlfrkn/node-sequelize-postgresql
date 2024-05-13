import { Router } from 'express';
import * as CompanyService from '../service/companyService.js'

const router = Router();

router.post("/register", async(req, res) => {
    const { email, password } = req.body;

    try{
        const company = await CompanyService.companySignUp(email, password);
        res.json(company);
    }catch(error){
        return res.status(500).json({message: error.message})
    }
});


export default router;