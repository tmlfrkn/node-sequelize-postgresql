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

export default router;

