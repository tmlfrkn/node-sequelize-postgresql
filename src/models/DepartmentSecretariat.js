import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";


export const DepartmentSecretariat = sequelize.define(
    "department_secretariat",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      deptMail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true,
    }
  );