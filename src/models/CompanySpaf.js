import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const CompanySpaf = sequelize.define(
    "companySpaf",
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
        },
        feedback: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        companyMail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
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
        timestapms: true
    }
)

export default CompanySpaf;