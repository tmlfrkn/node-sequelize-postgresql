import { Admin } from "../models/Admin.js";
import { User } from "../models/User.js";
import { Document } from "../models/Document.js";
import { Announce } from "../models/Announce.js"; // Import Announce model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs"


export async function adminRegister(email, password){
    const existingAdmin = await Admin.findOne({
        where: {
            id: 1
        }
    });

    if(existingAdmin){
        throw new Error('Admin already exists')
    }

    const user = await User.create({
        permission: 'admin'
    });

    if(!user){
        throw new Error('User couldn\'t created');
    }

    const admin = await Admin.create({
        email: email,
        password: await bcrypt.hash(password, 10),
        userId: user.id,
    });

    return admin;
}



export async function adminLogin(email, password, res){
    const admin = await Admin.findOne({
        where: {
            email: email
        }
    });

    if(admin) {
        const isSame = await bcrypt.compare(password.toString(), admin.password);
        if(isSame) {
            let token = jwt.sign({id: admin.userId}, process.env.SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000  // Token expires in 1 day
            });

            res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: false });
            console.log("Admin logged in", JSON.stringify(admin, null, 2));
            console.log("JWT Token:", token);

            // Additional admin information could be fetched here if necessary
            return "admin";
        }else {
            throw new Error('Invalid credentials');
        }
    }else {
        throw new Error('Admin not found');
    }
}





// Add this function
export async function updateAnnounceStatus(id) {
    const announce = await Announce.findByPk(id);
    if (!announce) {
        throw new Error('Announce not found');
    }
    announce.status = true; // Update status to true
    await announce.save();
    return announce;
}

export async function deleteAnnounce(id) {
    try {
        const document = await Announce.findByPk(id);
        if (!document) {
            throw new Error('Announce not found');
        }
        await document.destroy();
        return { message: 'Announcet deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting Announce: ' + error.message);
    }
}
