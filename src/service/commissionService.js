import { InternshipCommission } from "../models/InternshipCommission.js";
import { User } from "../models/User.js";
import { Document } from "../models/Document.js";
import jwt from "jsonwebtoken";
import fs from "fs"
import bcrypt from "bcrypt";


export async function commissionSignUp(commissionMail, password){
    const existingCommission = await InternshipCommission.findOne({
        where: {
            id: 5
        }
    })

    if(existingCommission){
        throw new Error('Commission already exists')
    }

    const user = await User.create({
        permission: 'commission'
    })

    if(!user){
        throw new Error('User couldn\'t created');
    }

    const commission = await InternshipCommission.create({
        email: commissionMail, 
        password: await bcrypt.hash(password, 10),
        userId: user.id,
    });

    return commission;
}



export async function commissionLogin(mail, password, res){
    const commission = await InternshipCommission.findOne({
        where: {
            email: mail
        }
    })

    if(commission) {
        const isSame = await bcrypt.compare(password.toString(), commission.password);

        if(isSame) {
            let token = jwt.sign({id: commission.userId}, process.env.SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000
            })

            //if password matches wit the one in the database
            //go ahead and generate a cookie for the user
            res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: false });
            console.log("user", JSON.stringify(commission, null, 2));
            console.log(token);
            //send user data
            const user = await User.findOne({
                where: {
                    id: commission.userId
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



export async function uploadDocument(fileData, fileName) {
    try {
        // Veritabanına dökümanı kaydet
        const document = await Document.create({
            fileName: fileName,
            fileData: fileData,
        });

        return document;
    } catch (error) {
        throw new Error('Döküman yüklenirken bir hata oluştu: ' + error.message);
    }
}
