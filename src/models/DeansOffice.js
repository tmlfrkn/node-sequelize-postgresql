import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";


export const DeansOffice = sequelize.define(
    "deans_office",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      deansMail: {
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