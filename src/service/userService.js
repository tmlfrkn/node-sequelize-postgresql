import { Company } from "../models/Company.js";
import { Student } from "../models/Student.js";
import { User } from "../models/User.js";
import { commissionLogin } from "./commissionService.js";
import { companyLogin } from "./companyService.js";
import { studentLogin } from "./studentService.js";
import { adminLogin } from "./adminService.js";

export async function login(mail, password, res) {
    const mailType = mail.slice(mail.indexOf("@") + 1);
    console.log(mailType, password);
    switch(mailType) {
        case "std.iyte.edu.tr": 
            return await studentLogin(mail.toString(), password.toString(), res);
        case "commission.com": 
            return await commissionLogin(mail.toString(), password.toString(),res);
        case "admin.com":
            return await adminLogin(mail.toString(), password.toString(),res);        
        default: 
            return await companyLogin(mail.toString(), password.toString(), res);
        
    }
}

export async function uploadDocument(){
    console.log('oldu');
    return true;
}