import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Student } from "./Student.js";

export const Document = sequelize.define(
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
      // Yeni eklenen studentId alanı
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Student,
          key: 'studentId' // Düzeltildi
        }
      }
    },
    {
      timestamps: true,
    }
);
