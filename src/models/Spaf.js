import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const Spaf = sequelize.define(
    "spaf",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        studentMail: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        timestapms: true
    }
)

export default Spaf;