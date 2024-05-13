import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";


export const Document = sequelize.define(
    "document",
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
      }
    },
    {
      timestamps: true,
    }
  );