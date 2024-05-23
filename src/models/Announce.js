import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import {Company} from "../models/Company.js"

export const Announce = sequelize.define(
    "announce",
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
    
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Company,
          key: 'id'
        }
    }},
    {
      timestamps: true,
    }
  );

  export default Announce;