import { InternshipCommission } from "../models/InternshipCommission.js";
import { User } from "../models/User.js";
import { Student } from "../models/Student.js";
import { Document } from "../models/Document.js";
import jwt from "jsonwebtoken";
import fs from "fs"
import bcrypt from "bcrypt";
import Spaf from "../models/Spaf.js";
import CompanySpaf from "../models/CompanySpaf.js";


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
export async function approveApplication(companySpafId) {
    try {
        
        const companySpaf = await CompanySpaf.findOne({
            where: {
                id: companySpafId
            }
        });
        
        const spaf = await Spaf.findOne({
            where: {
                companyMail: companySpaf.companyMail
            }
        })

        const student = await Student.findOne({ where: { studentMail: companySpaf.studentMail } });
        if (!student) {
          throw new Error('Student not found');
        }

      companySpaf.status = true;
      spaf.status = true;

      student.approvalStatus = 'Approved';
  
      await spaf.save();
      await companySpaf.save();
      await student.save();

    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  // Başvuru reddetme fonksiyonu
  export async function rejectApplication(companySpafId, feedback) {
    try {

        const companySpaf = await CompanySpaf.findOne({
          where: {
              id: companySpafId
          }
        });
  
        const spaf = await Spaf.findOne({
          where: {
            companyMail: companySpaf.companyMail
          }
        })

        const student = await Student.findOne({ where: { studentMail: companySpaf.studentMail } });
        
      if (!student) {
        throw new Error('Student not found');
      }
  

      spaf.feedback = feedback;
      spaf.status = false;
      companySpaf.status = false;
      companySpaf.feedback = feedback;
      
      await spaf.save();
      await companySpaf.save();

    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  // Bekleyen dökümanları getiren fonksiyon
  export const getPendingDocuments = async () => {
    try {
        const pendingDocuments = await Document.findAll({
            where: {
                status: 'pending'
            },
            include: 'student' // Öğrenci bilgilerini de dahil edelim
        });
        return pendingDocuments;
    } catch (error) {
        throw new Error('Bekleyen dökümanlar alınırken bir hata oluştu: ' + error.message);
    }
  };
  
  // Belirli bir öğrenciye ait dökümanları getiren fonksiyon
  export const getStudentDocuments = async (studentId) => {
    try {
        const studentDocuments = await Document.findAll({
            where: {
                studentId: studentId
            },
            include: 'student' // Öğrenci bilgilerini de dahil edelim
        });
        return studentDocuments;
    } catch (error) {
        throw new Error('Öğrenci dökümanları alınırken bir hata oluştu: ' + error.message);
    }
  };


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


export async function deleteDocument(id) {
    try {
        const document = await Document.findByPk(id);
        if (!document) {
            throw new Error('Document not found');
        }
        await document.destroy();
        return { message: 'Document deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting document: ' + error.message);
    }
}

export async function viewSpafs(){
    const companySpafs = await CompanySpaf.findAll({
        where: {
            status: false
        }
    });

    return companySpafs;
}

