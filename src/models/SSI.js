import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import {Student} from "../models/Student.js";

export const SSI = sequelize.define(
    "SSI",
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
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: true,

    }
      },
    {
      timestamps: true,
    }
  );

  export default SSI;