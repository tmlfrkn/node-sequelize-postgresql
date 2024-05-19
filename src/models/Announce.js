import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";


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
      }
    },
    {
      timestamps: true,
    }
  );

  export default Announce;