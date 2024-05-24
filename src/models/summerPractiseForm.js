import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Student } from './Student.js';

export const SummerPractiseForm = sequelize.define("summerPractiseForm", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    },
    studentMail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
    fileData: {
        type: DataTypes.BLOB,
        allowNull: true,
        defaultValue: null
    } 
    
}, {
    timestamps: true,
});

export default SummerPractiseForm;