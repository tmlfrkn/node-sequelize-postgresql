import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";


export const DepartmentSecreteriat = sequelize.define(
    "department_secreteriat",
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },

    },
    {
      timestamps: true,
    }
  );

