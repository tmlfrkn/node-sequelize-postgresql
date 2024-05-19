import { Company } from '../models/Company.js';
import { User } from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { InternshipCommission } from '../models/InternshipCommission.js';
import { Announce } from '../models/Announce.js';


export async function companySignUp(companyMail, password){
    const existingCompany = await Company.findOne({
        where: {
            email: companyMail
        }
    })

    if(existingCompany){
        throw new Error('Company already exists');
    }

    const user = await User.create({
        permission: "company"
    })

    if(!user){
        throw new Error('User couldn\'t created');
    }

    const company = await Company.create({
        email: companyMail,
        password: await bcrypt.hash(password, 10),
        userId: user.id
    });

    return company;
}

export async function companyLogin(mail, password, res) {
    const company = await Company.findOne({
        where: {
            email: mail,
        }
    });

    if(company) {
        const isSame = await bcrypt.compare(password.toString(), company.password);

        if(isSame) {
            let token = jwt.sign({id: company.userId}, process.env.SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000
            })

            //if password matches wit the one in the database
            //go ahead and generate a cookie for the user
            res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: false });
            console.log("user", JSON.stringify(company, null, 2));
            console.log(token);
            //send user data

            const user = await User.findOne({
                where: {
                    id: company.userId
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
        const document = await Announce.create({
            fileName: fileName,
            fileData: fileData,
            status: false
        });

        return document;
    } catch (error) {
        throw new Error('Döküman yüklenirken bir hata oluştu: ' + error.message);
    }
}