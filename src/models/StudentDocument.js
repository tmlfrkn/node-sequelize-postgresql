import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Student } from "../models/Student.js";

export const StudentDocument = sequelize.define(
    "student_document",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
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
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      studentId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: Student,
          key: 'studentId'
        }
    }},
    {
      timestamps: true,
    }
  );
