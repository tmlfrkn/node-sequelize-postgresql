import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const Student = sequelize.define(
  "student",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    classNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    studentMail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    studentId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
  },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
  },
  {
    timestamps: true,
  }
);