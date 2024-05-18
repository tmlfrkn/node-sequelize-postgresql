import { Student } from '../models/Student.js';
import { User } from '../models/User.js';
import { Document } from '../models/Document.js';
import jwt from "jsonwebtoken";


export async function studentRegister(studentMail, studentId) {
    const existingStudent = await Student.findOne({
        where: {
            studentMail
        }
    });

    if(existingStudent) {
        throw new Error('User already exists');
    }

    const user = await User.create({
        permission: 'student'
    })

    if(!user){
        throw new Error('User couldn\'t created');
    }

    const student = await Student.create({
        firstName: "asd",
        lastName: "asd",
        classNumber: "3",
        studentMail,
        studentId,
        userId: user.id,
        phone: "123"
    });

    return student;
}

export async function studentLogin(mail, password, res) {
    const student = await Student.findOne({
        where: {
            studentMail: mail,
        }
    });

    if(student) {
        const isSame = student.studentId === password;

        if(isSame) {
            let token = jwt.sign({id: student.userId}, process.env.SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000
            })

            //if password matches wit the one in the database
            //go ahead and generate a cookie for the user
            res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: false });
            console.log("user", JSON.stringify(student, null, 2));
            console.log(token);
            //send user data
            const user = await User.findOne({
                where: {
                    id: student.userId
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