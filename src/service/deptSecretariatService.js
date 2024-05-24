import { DepartmentSecreteriat } from '../models/DepartmentSecreteriat.js';
import { User } from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SSI } from "../models/SSI.js";


export async function deptSignUp(deptMail, password){

    const user = await User.create({
        permission: 'dept_secreteriat'
    })

    if(!user){
        throw new Error('User couldn\'t created');
    }

    const dept_secreteriat= await DepartmentSecreteriat.create({
        deptMail: deptMail, 
        password: await bcrypt.hash(password, 10),
        userId: user.id,
    });

    return dept_secreteriat;
}

export async function deptLogin(mail, password, res) {
    const dept_secreteriat = await DepartmentSecreteriat.findOne({
        where: {
            deptMail: mail,
        }
    });

    if(dept_secreteriat) {
        const isSame = await bcrypt.compare(password.toString(), dept_secreteriat.password);

        if(isSame) {
            let token = jwt.sign({id: dept_secreteriat.userId}, process.env.SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000
            })


            res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: false });
            console.log("user", JSON.stringify(dept_secreteriat, null, 2));
            console.log(token);
            //send user data

            const user = await User.findOne({
                where: {
                    id: dept_secreteriat.userId
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

export async function uploadDocument(fileData, fileName,userId) {
    try {
        const dept_secreteriat = await DepartmentSecreteriat.findOne({
            where: {
                userId: userId
            }
        })
        if(dept_secreteriat){
            const ssi = await SSI.create({
            fileName: fileName,
            fileData: fileData,
            studentId: studentId           
        });
        return ssi
        }
        
        
    } catch (error) {
        throw new Error('Error while uploading document: ' + error.message);
    }
}