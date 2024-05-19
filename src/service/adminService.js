import { Admin } from "../models/Admin.js";
import { User } from "../models/User.js";
import { Document } from "../models/Document.js";
import { Announce } from "../models/Announce.js"; // Import Announce model
import jwt from "jsonwebtoken";
import fs from "fs"
import bcrypt from "bcrypt";

export async function adminRegister(adminMail, password){
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
        email: adminMail,
        password: await bcrypt.hash(password, 10),
        userId: user.id,
    });

    return admin;
}

// Add this function
export async function updateAnnounceStatus(announceId) {
    const announce = await Announce.findByPk(announceId);
    if (!announce) {
        throw new Error('Announce not found');
    }
    announce.status = true; // Update status to true
    await announce.save();
    return announce;
}
