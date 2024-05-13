import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";


export const Company = sequelize.define(
    "company",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
      companyName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
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