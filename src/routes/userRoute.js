import { Router } from "express";
import * as UserService from "../service/userService.js";

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await UserService.login(email, password, res);
        res.json(user);
    }catch(error){
        res.status(400).json({message: error.message});
    }
})

// router.post("/uploadDocument", authenticate, async(req, res) => {
//     try{
//         const resp = await UserService.uploadDocument();
//         res.json(resp);
//     }catch(error){
//         res.status(400).json({message: error.message});
//     }
// })

export default router;