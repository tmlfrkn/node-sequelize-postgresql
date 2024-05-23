import { DeansOffice } from '../models/DeansOffice.js';
import { User } from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SSI } from "../models/SSI.js";



export async function deansSignUp(deansMail, password){

    const user = await User.create({
        permission: 'deans_office'
    })

    if(!user){
        throw new Error('User couldn\'t created');
    }

    const deans= await DeansOffice.create({
        deansMail: deansMail, 
        password: await bcrypt.hash(password, 10),
        userId: user.id,
    });

    return deans;
}

export async function deansLogin(mail, password, res) {
    const deans_office = await DeansOffice.findOne({
        where: {
            deansMail: mail,
        }
    });

    if(deans_office) {
        const isSame = await bcrypt.compare(password.toString(), deans_office.password);

        if(isSame) {
            let token = jwt.sign({id: deans_office.userId}, process.env.SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000
            })


            res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: false });
            console.log("user", JSON.stringify(deans_office, null, 2));
            console.log(token);
            //send user data

            const user = await User.findOne({
                where: {
                    id: deans_office.userId
                },
                attributes: ['id', 'permission']
            })

            return user.permission;
        }else {
            throw new Error('Invalid credentials');
        }
    }else {
        throw new Error('User not found');
    }
}

export async function uploadDocument(fileData, fileName,userId,studentId) {
    try {
        const deans_office = await DeansOffice.findOne({
            where: {
                userId: userId
            }
        })
        if(deans_office){
            const ssi = await SSI.create({
            fileName: fileName,
            fileData: fileData,
            studentId: studentId
            
        });
        return ssi;
        }
        
        
    } catch (error) {
        throw new Error('Error while uploading document: ' + error.message);
    }
}
