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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deansMail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: true,
    }
  );

  export default DeansOffice;