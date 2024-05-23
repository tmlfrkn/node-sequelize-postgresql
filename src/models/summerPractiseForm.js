import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Student } from './Student.js';

export const summerPractiseForm = sequelize.define("summerPractiseForm", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    faculty: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    class: {
        type: DataTypes.STRING,
        allowNull: false
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    },
    nationalId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firmName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firmAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firmTelephone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    internStart: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    internEnd: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    totalWorkDays: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    employerName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    employerJob: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: true,
});

export default summerPractiseForm;
